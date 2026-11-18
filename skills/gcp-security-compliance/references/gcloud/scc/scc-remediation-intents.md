---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/scc/remediation-intents
---

# gcloud scc remediation-intents

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha scc remediation-intents auto-remediate

```text
NAME
    gcloud alpha scc remediation-intents auto-remediate - command for
        semi-automatic remediation of SCC findings

SYNOPSIS
    gcloud alpha scc remediation-intents auto-remediate
        --git-config-path=GIT_SETTINGS --org-id=ORG_ID
        [--root-dir-path=ROOT_DIR_PATH; default="."] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc remediation-intents create

```text
NAME
    gcloud alpha scc remediation-intents create - creates a remediation intent
        resource

SYNOPSIS
    gcloud alpha scc remediation-intents create --parent=PARENT
        --workflow-type=WORKFLOW_TYPE [--async] [--finding-name=FINDING_NAME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc remediation-intents delete

```text
NAME
    gcloud alpha scc remediation-intents delete - deletes a remediation intent
        resource

SYNOPSIS
    gcloud alpha scc remediation-intents delete
        (REMEDIATIONINTENT : --location=LOCATION --organization=ORGANIZATION)
        [--async] [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc remediation-intents describe

```text
NAME
    gcloud alpha scc remediation-intents describe - describes a remediation
        intent resource

SYNOPSIS
    gcloud alpha scc remediation-intents describe
        (REMEDIATIONINTENT : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc remediation-intents list

```text
NAME
    gcloud alpha scc remediation-intents list - lists the remediation intent
        resources

SYNOPSIS
    gcloud alpha scc remediation-intents list PARENT [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc remediation-intents update

```text
NAME
    gcloud alpha scc remediation-intents update - updates a remediation intent
        resource

SYNOPSIS
    gcloud alpha scc remediation-intents update
        (REMEDIATIONINTENT : --location=LOCATION --organization=ORGANIZATION)
        --ri-from-file=RI_FROM_FILE [--async] [--update-mask=UPDATE_MASK]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/scc/remediation-intents (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
