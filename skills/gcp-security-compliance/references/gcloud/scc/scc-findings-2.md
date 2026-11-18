---
source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/findings
---

# gcloud scc findings (part 2/2)

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha scc findings update

```text
NAME
    gcloud alpha scc findings update - update a Security Command Center finding

SYNOPSIS
    gcloud alpha scc findings update FINDING [--event-time=EVENT_TIME]
        [--external-uri=EXTERNAL_URI] [--location=LOCATION; default="global"]
        [--source=SOURCE; default="-"] [--source-properties=[KEY=VALUE,...]]
        [--state=STATE] [--update-mask=UPDATE_MASK]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc findings update-marks

```text
NAME
    gcloud alpha scc findings update-marks - update Security Command Center
        finding's security marks

SYNOPSIS
    gcloud alpha scc findings update-marks FINDING
        [--location=LOCATION; default="global"]
        [--security-marks=[KEY=VALUE,...]] [--source=SOURCE; default="-"]
        [--start-time=START_TIME] [--update-mask=UPDATE_MASK]
        [--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/scc/findings (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
