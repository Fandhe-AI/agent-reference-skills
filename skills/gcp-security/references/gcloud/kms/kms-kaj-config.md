---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/kms/kaj-config
---

# gcloud kms kaj-config

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta kms kaj-config describe

```text
NAME
    gcloud beta kms kaj-config describe - describe the KajPolicyConfig of an
        organization/folder/project

SYNOPSIS
    gcloud beta kms kaj-config describe
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT_ID)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms kaj-config show-effective-config

```text
NAME
    gcloud beta kms kaj-config show-effective-config - gets the effective
        KajPolicyConfig for a given project

SYNOPSIS
    gcloud beta kms kaj-config show-effective-config [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta kms kaj-config update

```text
NAME
    gcloud beta kms kaj-config update - updates the
        KeyAccessJustificationsPolicyConfig of an organization/folder/project

SYNOPSIS
    gcloud beta kms kaj-config update
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT_ID)
        [--allowed-access-reasons=[ALLOWED_ACCESS_REASONS,...]
          | --reset-kaj-policy-config] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms kaj-config describe

```text
NAME
    gcloud alpha kms kaj-config describe - describe the KajPolicyConfig of an
        organization/folder/project

SYNOPSIS
    gcloud alpha kms kaj-config describe
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT_ID)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms kaj-config show-effective-config

```text
NAME
    gcloud alpha kms kaj-config show-effective-config - gets the effective
        KajPolicyConfig for a given project

SYNOPSIS
    gcloud alpha kms kaj-config show-effective-config [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha kms kaj-config update

```text
NAME
    gcloud alpha kms kaj-config update - updates the
        KeyAccessJustificationsPolicyConfig of an organization/folder/project

SYNOPSIS
    gcloud alpha kms kaj-config update
        (--folder=FOLDER | --organization=ORGANIZATION | --project=PROJECT_ID)
        [--allowed-access-reasons=[ALLOWED_ACCESS_REASONS,...]
          | --reset-kaj-policy-config] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/kms/kaj-config (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
