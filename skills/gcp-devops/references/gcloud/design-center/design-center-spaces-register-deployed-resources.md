---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/design-center/spaces/register-deployed-resources
---

# gcloud design-center spaces register-deployed-resources

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha design-center spaces register-deployed-resources

```text
NAME
    gcloud alpha design-center spaces register-deployed-resources - register
        resources with a deployed application in App Hub

SYNOPSIS
    gcloud alpha design-center spaces register-deployed-resources
        (SPACE : --location=LOCATION) --apphub-application=APPHUB_APPLICATION
        (--terraform-state=TERRAFORM_STATE
          | --tfstate-signed-gcs-uri=TFSTATE_SIGNED_GCS_URI) [--async]
        [--service-account=SERVICE_ACCOUNT] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/design-center/spaces/register-deployed-resources (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
