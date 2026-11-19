---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/deployment-manager/type-providers
---

# gcloud deployment-manager type-providers

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta deployment-manager type-providers create

```text
NAME
    gcloud beta deployment-manager type-providers create - create a type
        provider

SYNOPSIS
    gcloud beta deployment-manager type-providers create PROVIDER_NAME
        --descriptor-url=DESCRIPTOR_URL [--api-options-file=API_OPTIONS_FILE]
        [--async] [--custom-certificate-authority-roots=CA_ROOT,[CA_ROOT,...]]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deployment-manager type-providers delete

```text
NAME
    gcloud beta deployment-manager type-providers delete - delete a type
        provider

SYNOPSIS
    gcloud beta deployment-manager type-providers delete PROVIDER_NAME
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deployment-manager type-providers describe

```text
NAME
    gcloud beta deployment-manager type-providers describe - describe a type
        provider entry in Type Registry

SYNOPSIS
    gcloud beta deployment-manager type-providers describe PROVIDER_NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deployment-manager type-providers list

```text
NAME
    gcloud beta deployment-manager type-providers list - list type providers in
        a project

SYNOPSIS
    gcloud beta deployment-manager type-providers list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta deployment-manager type-providers update

```text
NAME
    gcloud beta deployment-manager type-providers update - update a type
        provider

SYNOPSIS
    gcloud beta deployment-manager type-providers update PROVIDER_NAME
        --descriptor-url=DESCRIPTOR_URL [--api-options-file=API_OPTIONS_FILE]
        [--async] [--custom-certificate-authority-roots=CA_ROOT,[CA_ROOT,...]]
        [--description=DESCRIPTION] [--remove-labels=[KEY,...]]
        [--update-labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deployment-manager type-providers create

```text
NAME
    gcloud alpha deployment-manager type-providers create - create a type
        provider

SYNOPSIS
    gcloud alpha deployment-manager type-providers create PROVIDER_NAME
        --descriptor-url=DESCRIPTOR_URL [--api-options-file=API_OPTIONS_FILE]
        [--async] [--custom-certificate-authority-roots=CA_ROOT,[CA_ROOT,...]]
        [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deployment-manager type-providers delete

```text
NAME
    gcloud alpha deployment-manager type-providers delete - delete a type
        provider

SYNOPSIS
    gcloud alpha deployment-manager type-providers delete PROVIDER_NAME
        [--async] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deployment-manager type-providers describe

```text
NAME
    gcloud alpha deployment-manager type-providers describe - describe a type
        provider entry in Type Registry

SYNOPSIS
    gcloud alpha deployment-manager type-providers describe PROVIDER_NAME
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deployment-manager type-providers list

```text
NAME
    gcloud alpha deployment-manager type-providers list - list type providers
        in a project

SYNOPSIS
    gcloud alpha deployment-manager type-providers list [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deployment-manager type-providers update

```text
NAME
    gcloud alpha deployment-manager type-providers update - update a type
        provider

SYNOPSIS
    gcloud alpha deployment-manager type-providers update PROVIDER_NAME
        --descriptor-url=DESCRIPTOR_URL [--api-options-file=API_OPTIONS_FILE]
        [--async] [--custom-certificate-authority-roots=CA_ROOT,[CA_ROOT,...]]
        [--description=DESCRIPTION] [--remove-labels=[KEY,...]]
        [--update-labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Deprecated: the Deployment Manager documentation says "Support for Google Cloud Deployment Manager was discontinued on April 1, 2026.", "After June 30, 2027, you won't be able to use the Deployment Manager service, and it will be turned down. All related APIs and functions will no longer be supported." and "As of June 30, 2026, new users are blocked from enabling Google Cloud Deployment Manager V2 API or creating their first deployment."; it recommends Infrastructure Manager (https://docs.cloud.google.com/deployment-manager/docs/deprecations, retrieved 2026-11-19).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/deployment-manager/type-providers (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
