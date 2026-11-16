---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/compute/firewall-rules/migrate
---

# gcloud compute firewall-rules migrate

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta compute firewall-rules migrate

```text
NAME
    gcloud beta compute firewall-rules migrate - create a new Network Firewall
        Policy and move all customer defined firewall rules there

SYNOPSIS
    gcloud beta compute firewall-rules migrate --source-network=SOURCE_NETWORK
        (--bind-tags-to-instances | --export-exclusion-patterns
          | --export-tag-mapping
          | --target-firewall-policy=TARGET_FIREWALL_POLICY)
        [--exclusion-patterns-file=EXCLUSION_PATTERNS_FILE]
        [--export-terraform-script] [--force]
        [--skip-migrate-target-service-accounts-to-tags]
        [--tag-mapping-file=TAG_MAPPING_FILE]
        [--terraform-script-output-file=TERRAFORM_SCRIPT_OUTPUT_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute firewall-rules migrate

```text
NAME
    gcloud alpha compute firewall-rules migrate - create a new Network Firewall
        Policy and move all customer defined firewall rules there

SYNOPSIS
    gcloud alpha compute firewall-rules migrate --source-network=SOURCE_NETWORK
        (--bind-tags-to-instances | --export-exclusion-patterns
          | --export-tag-mapping
          | --target-firewall-policy=TARGET_FIREWALL_POLICY)
        [--exclusion-patterns-file=EXCLUSION_PATTERNS_FILE]
        [--export-terraform-script] [--force]
        [--skip-migrate-target-service-accounts-to-tags]
        [--tag-mapping-file=TAG_MAPPING_FILE]
        [--terraform-script-output-file=TERRAFORM_SCRIPT_OUTPUT_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/compute/firewall-rules/migrate (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
