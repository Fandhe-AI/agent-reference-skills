---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/design-center/spaces/applications/export
---

# gcloud design-center spaces applications export

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha design-center spaces applications export

```text
NAME
    gcloud alpha design-center spaces applications export - export IaC for an
        application

SYNOPSIS
    gcloud alpha design-center spaces applications export
        (APPLICATION : --space=SPACE) [--async]
        [--export-iac-config-format=EXPORT_IAC_CONFIG_FORMAT]
        [--iac-format=IAC_FORMAT] [--location=LOCATION]
        [--artifact-location-gcs-uri=ARTIFACT_LOCATION_GCS_URI
          | [--developer-connect-export-config-dir=DEVELOPER_CONNECT_EXPORT_CONFIG_DIR (--developer-connect-export-config-repo-uri=DEVELOPER_CONNECT_EXPORT_CONFIG_REPO_URI : --connection=CONNECTION) : --developer-connect-export-config-branch=DEVELOPER_CONNECT_EXPORT_CONFIG_BRANCH]]
        [--tf-config-module-git-proxy-enabled
          | --tf-config-module-local-references-enabled] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/design-center/spaces/applications/export (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
