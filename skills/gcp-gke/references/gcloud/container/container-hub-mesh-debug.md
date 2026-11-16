---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/container/hub/mesh/debug
---

# gcloud container hub mesh debug

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta container hub mesh debug bug-report

```text
NAME
    gcloud beta container hub mesh debug bug-report - capture cluster
        information and logs into archive to help diagnose problems

SYNOPSIS
    gcloud beta container hub mesh debug bug-report
        (--membership=MEMBERSHIP : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container hub mesh debug proxy-config

```text
NAME
    gcloud beta container hub mesh debug proxy-config - retrieve a
        configuration summary for a given Envoy instance

SYNOPSIS
    gcloud beta container hub mesh debug proxy-config POD_NAME_NAMESPACE
        --type=TYPE (--membership=MEMBERSHIP : --location=LOCATION)
        [--fqdn=FQDN] [--output=OUTPUT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta container hub mesh debug proxy-status

```text
NAME
    gcloud beta container hub mesh debug proxy-status - retrieve the envoy
        configuration sync status

SYNOPSIS
    gcloud beta container hub mesh debug proxy-status
        (--membership=MEMBERSHIP : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub mesh debug bug-report

```text
NAME
    gcloud alpha container hub mesh debug bug-report - capture cluster
        information and logs into archive to help diagnose problems

SYNOPSIS
    gcloud alpha container hub mesh debug bug-report
        (--membership=MEMBERSHIP : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub mesh debug proxy-config

```text
NAME
    gcloud alpha container hub mesh debug proxy-config - retrieve a
        configuration summary for a given Envoy instance

SYNOPSIS
    gcloud alpha container hub mesh debug proxy-config POD_NAME_NAMESPACE
        --type=TYPE (--membership=MEMBERSHIP : --location=LOCATION)
        [--fqdn=FQDN] [--output=OUTPUT] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha container hub mesh debug proxy-status

```text
NAME
    gcloud alpha container hub mesh debug proxy-status - retrieve the envoy
        configuration sync status

SYNOPSIS
    gcloud alpha container hub mesh debug proxy-status
        (--membership=MEMBERSHIP : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/container/hub/mesh/debug (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
