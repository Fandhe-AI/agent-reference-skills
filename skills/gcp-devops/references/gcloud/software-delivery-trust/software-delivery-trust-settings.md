---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/software-delivery-trust/settings
---

# gcloud software-delivery-trust settings

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha software-delivery-trust settings binauthz-config describe

```text
NAME
    gcloud alpha software-delivery-trust settings binauthz-config describe -
        retrieve details of a trusted Binary Authorization config

SYNOPSIS
    gcloud alpha software-delivery-trust settings binauthz-config describe
        --location=LOCATION [--endpoint-mode=ENDPOINT_MODE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha software-delivery-trust settings binauthz-config update

```text
NAME
    gcloud alpha software-delivery-trust settings binauthz-config update -
        update a Binary Authorization trust config

SYNOPSIS
    gcloud alpha software-delivery-trust settings binauthz-config update
        --location=LOCATION [--async] [--endpoint-mode=ENDPOINT_MODE]
        [--publish-destination=PUBLISH_DESTINATION]
        [--attestors-file=FILE_PATH | --clear-attestors
          | --add-attestor=[gate=GATE,
          signing-crypto-key-version=KEY_VERSION,...]
          --remove-attestor=[GATE,...], --remove-attestors=[GATE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/software-delivery-trust/settings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
