---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/spanner/databases/wait-for-reencryption
---

# gcloud spanner databases wait-for-reencryption

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha spanner databases wait-for-reencryption

```text
NAME
    gcloud alpha spanner databases wait-for-reencryption - wait for a Cloud
        Spanner database CMEK re-encryption to converge

SYNOPSIS
    gcloud alpha spanner databases wait-for-reencryption
        (DATABASE : --instance=INSTANCE)
        (--clear-kms-keys | --kms-keys=KMS_KEY,[KMS_KEY,...])
        [--endpoint-mode=ENDPOINT_MODE] [--timeout=TIMEOUT; default="4h"]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/spanner/databases/wait-for-reencryption (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
