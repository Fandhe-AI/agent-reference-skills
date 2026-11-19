---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/app-lifecycle-manager/flags/create
---

# gcloud app-lifecycle-manager flags create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta app-lifecycle-manager flags create

```text
NAME
    gcloud beta app-lifecycle-manager flags create - create Flag

SYNOPSIS
    gcloud beta app-lifecycle-manager flags create FLAG
        --flag-value-type=FLAG_VALUE_TYPE --key=KEY --unit-kind=UNIT_KIND
        [--annotations=[ANNOTATIONS,...]] [--description=DESCRIPTION]
        [--evaluation-spec=[allocations=ALLOCATIONS],[attributes=ATTRIBUTES],
          [defaultAllocation=DEFAULTALLOCATION],
          [defaultVariant=DEFAULTVARIANT],[rules=RULES]] [--flag-set=FLAG_SET]
        [--labels=[LABELS,...]] [--location=LOCATION] [--state=STATE]
        [--variants=[booleanValue=BOOLEANVALUE],[description=DESCRIPTION],
          [doubleValue=DOUBLEVALUE],
          [id=ID],[integerValue=INTEGERVALUE],[stringValue=STRINGVALUE]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/app-lifecycle-manager/flags/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
