---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/alloydb/connect
---

# gcloud alloydb connect

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta alloydb connect

```text
NAME
    gcloud beta alloydb connect - connect to an AlloyDB instance using the
        AlloyDB Auth Proxy

SYNOPSIS
    gcloud beta alloydb connect INSTANCE --cluster=CLUSTER --region=REGION
        [--database=DATABASE, -d DATABASE] [--port=PORT; default=9471]
        [--auto-iam-authn | --user=USER, -u USER] [--psc | --public-ip]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha alloydb connect

```text
NAME
    gcloud alpha alloydb connect - connect to an AlloyDB instance using the
        AlloyDB Auth Proxy

SYNOPSIS
    gcloud alpha alloydb connect INSTANCE --cluster=CLUSTER --region=REGION
        [--database=DATABASE, -d DATABASE] [--port=PORT; default=9471]
        [--auto-iam-authn | --user=USER, -u USER] [--psc | --public-ip]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/alloydb/connect (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
