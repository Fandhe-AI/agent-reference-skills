---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/compute/instance-groups/managed/set-autohealing
---

# gcloud compute instance-groups managed set-autohealing

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta compute instance-groups managed set-autohealing

```text
NAME
    gcloud beta compute instance-groups managed set-autohealing - set
        autohealing policy for managed instance group

SYNOPSIS
    gcloud beta compute instance-groups managed set-autohealing NAME
        [--initial-delay=INITIAL_DELAY]
        [--health-check=HEALTH_CHECK | --http-health-check=HTTP_HEALTH_CHECK
          | --https-health-check=HTTPS_HEALTH_CHECK]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instance-groups managed set-autohealing

```text
NAME
    gcloud alpha compute instance-groups managed set-autohealing - set
        autohealing policy for managed instance group

SYNOPSIS
    gcloud alpha compute instance-groups managed set-autohealing NAME
        [--initial-delay=INITIAL_DELAY]
        [--health-check=HEALTH_CHECK | --http-health-check=HTTP_HEALTH_CHECK
          | --https-health-check=HTTPS_HEALTH_CHECK]
        [--region=REGION | --zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/compute/instance-groups/managed/set-autohealing (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
