---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/services/policies
---

# gcloud services policies

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta services policies get

```text
NAME
    gcloud beta services policies get - get the consumer policy for a project,
        folder or organization

SYNOPSIS
    gcloud beta services policies get [--output-file=OUTPUT_FILE]
        [--policy-name=POLICY_NAME; default="default"]
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta services policies get-effective

```text
NAME
    gcloud beta services policies get-effective - get effective policy for a
        project, folder or organization

SYNOPSIS
    gcloud beta services policies get-effective [--view=VIEW; default="BASIC"]
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta services policies test-enabled

```text
NAME
    gcloud beta services policies test-enabled - test a value against the
        result of merging consumer policies in the resource hierarchy

SYNOPSIS
    gcloud beta services policies test-enabled SERVICE
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta services policies update

```text
NAME
    gcloud beta services policies update - update the consumer policy for a
        project, folder or organization

SYNOPSIS
    gcloud beta services policies update
        --consumer-policy-file=CONSUMER_POLICY_FILE [--bypass-api-usage-check]
        [--bypass-dependency-check] [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services policies get

```text
NAME
    gcloud alpha services policies get - get the consumer policy for a project,
        folder or organization

SYNOPSIS
    gcloud alpha services policies get [--output-file=OUTPUT_FILE]
        [--policy-name=POLICY_NAME; default="default"]
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services policies get-effective

```text
NAME
    gcloud alpha services policies get-effective - get effective policy for a
        project, folder or organization

SYNOPSIS
    gcloud alpha services policies get-effective [--view=VIEW; default="BASIC"]
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services policies test-enabled

```text
NAME
    gcloud alpha services policies test-enabled - test a value against the
        result of merging consumer policies in the resource hierarchy

SYNOPSIS
    gcloud alpha services policies test-enabled SERVICE
        [--folder=FOLDER_ID | --organization=ORGANIZATION_ID
          | --project=PROJECT_ID] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha services policies update

```text
NAME
    gcloud alpha services policies update - update the consumer policy for a
        project, folder or organization

SYNOPSIS
    gcloud alpha services policies update
        --consumer-policy-file=CONSUMER_POLICY_FILE [--bypass-api-usage-check]
        [--bypass-dependency-check] [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/services/policies (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
