---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/workspace-key-access/configs
---

# gcloud workspace-key-access configs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta workspace-key-access configs create

```text
NAME
    gcloud beta workspace-key-access configs create - create a Workspace Key
        Access config

SYNOPSIS
    gcloud beta workspace-key-access configs create
        (CONFIG : --location=LOCATION) --admin-emails=[ADMIN_EMAILS,...]
        --customer-id=CUSTOMER_ID
        --idp-configs=[additionalAudiences=ADDITIONALAUDIENCES],
          [audience=AUDIENCE],
          [idpType=IDPTYPE],[issuer=ISSUER],[jwksUri=JWKSURI]
        --kacls-owner-domains=[KACLS_OWNER_DOMAINS,...]
        [--annotations=[ANNOTATIONS,...]] [--async] [--labels=[LABELS,...]]
        [--request-id=REQUEST_ID] [--tags=[TAGS,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta workspace-key-access configs delete

```text
NAME
    gcloud beta workspace-key-access configs delete - delete a Workspace Key
        Access config

SYNOPSIS
    gcloud beta workspace-key-access configs delete
        (CONFIG : --location=LOCATION) [--async] [--request-id=REQUEST_ID]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta workspace-key-access configs describe

```text
NAME
    gcloud beta workspace-key-access configs describe - describe a Workspace
        Key Access config

SYNOPSIS
    gcloud beta workspace-key-access configs describe
        (CONFIG : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta workspace-key-access configs list

```text
NAME
    gcloud beta workspace-key-access configs list - list Workspace Key Access
        configs

SYNOPSIS
    gcloud beta workspace-key-access configs list --location=LOCATION
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta workspace-key-access configs update

```text
NAME
    gcloud beta workspace-key-access configs update - update a Workspace Key
        Access config

SYNOPSIS
    gcloud beta workspace-key-access configs update
        (CONFIG : --location=LOCATION) [--admin-emails=[ADMIN_EMAILS,...]]
        [--async] [--kacls-owner-domains=[KACLS_OWNER_DOMAINS,...]]
        [--request-id=REQUEST_ID]
        [--annotations=[ANNOTATIONS,...]
          | --update-annotations=[UPDATE_ANNOTATIONS,...] --clear-annotations
          | --remove-annotations=REMOVE_ANNOTATIONS]
        [--idp-configs=[additionalAudiences=ADDITIONALAUDIENCES],
          [audience=AUDIENCE],
          [idpType=IDPTYPE],[issuer=ISSUER],[jwksUri=JWKSURI]
          | --add-idp-configs=[additionalAudiences=ADDITIONALAUDIENCES],
          [audience=AUDIENCE],
          [idpType=IDPTYPE],[issuer=ISSUER],[jwksUri=JWKSURI]
          --clear-idp-configs
          | --remove-idp-configs=[additionalAudiences=ADDITIONALAUDIENCES],
          [audience=AUDIENCE],
          [idpType=IDPTYPE],[issuer=ISSUER],[jwksUri=JWKSURI]]
        [--labels=[LABELS,...]
          | --update-labels=[UPDATE_LABELS,...] --clear-labels
          | --remove-labels=REMOVE_LABELS]
        [--tags=[TAGS,...] | --update-tags=[UPDATE_TAGS,...] --clear-tags
          | --remove-tags=REMOVE_TAGS] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/workspace-key-access/configs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
