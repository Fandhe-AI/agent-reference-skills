---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/resource-config/terraform
---

# gcloud resource-config terraform

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta resource-config terraform generate-import

```text
NAME
    gcloud beta resource-config terraform generate-import - generate Terraform
        import script for exported resources

SYNOPSIS
    gcloud beta resource-config terraform generate-import INPUT_PATH
        [--output-dir=OUTPUT_DIR | --output-module-file=OUTPUT_MODULE_FILE
          --output-script-file=OUTPUT_SCRIPT_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-config terraform generate-import

```text
NAME
    gcloud alpha resource-config terraform generate-import - generate Terraform
        import script for exported resources

SYNOPSIS
    gcloud alpha resource-config terraform generate-import INPUT_PATH
        [--output-dir=OUTPUT_DIR | --output-module-file=OUTPUT_MODULE_FILE
          --output-script-file=OUTPUT_SCRIPT_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha resource-config terraform init-provider

```text
NAME
    gcloud alpha resource-config terraform init-provider - generate main.tf
        file to configure Google Cloud Terraform Provider

SYNOPSIS
    gcloud alpha resource-config terraform init-provider [--region=REGION]
        [--zone=ZONE]
        [--use-gcloud-billing-project | [--tf-user-project-override
          : --tf-billing-project=TF_BILLING_PROJECT]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/resource-config/terraform (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
