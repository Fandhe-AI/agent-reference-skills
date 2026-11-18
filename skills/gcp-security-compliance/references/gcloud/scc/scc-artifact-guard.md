---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/scc/artifact-guard
---

# gcloud scc artifact-guard

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha scc artifact-guard connectors create

```text
NAME
    gcloud alpha scc artifact-guard connectors create - create a new artifact
        guard connector

SYNOPSIS
    gcloud alpha scc artifact-guard connectors create
        (CONNECTOR : --location=LOCATION --organization=ORGANIZATION)
        --pipeline-type=PIPELINE_TYPE [--description=DESCRIPTION]
        [--display-name=DISPLAY_NAME] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc artifact-guard connectors delete

```text
NAME
    gcloud alpha scc artifact-guard connectors delete - delete an artifact
        guard connector

SYNOPSIS
    gcloud alpha scc artifact-guard connectors delete
        (CONNECTOR : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc artifact-guard connectors describe

```text
NAME
    gcloud alpha scc artifact-guard connectors describe - describe an artifact
        guard connector

SYNOPSIS
    gcloud alpha scc artifact-guard connectors describe
        (CONNECTOR : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc artifact-guard connectors list

```text
NAME
    gcloud alpha scc artifact-guard connectors list - list artifact guard
        connectors

SYNOPSIS
    gcloud alpha scc artifact-guard connectors list
        (PARENT : --organization=ORGANIZATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc artifact-guard images scan

```text
NAME
    gcloud alpha scc artifact-guard images scan - scan an image with Artifact
        Guard

SYNOPSIS
    gcloud alpha scc artifact-guard images scan RESOURCE_URI --parent=PARENT
        --scan-type=SCAN_TYPE [--async] [--connector-id=CONNECTOR_ID]
        [--remote]
        [[--cloud-build-id=CLOUD_BUILD_ID
          --cloud-build-project-id=CLOUD_BUILD_PROJECT_ID
          : --cloud-build-trigger-id=CLOUD_BUILD_TRIGGER_ID]
          | [--github-run-id=GITHUB_RUN_ID
          : --github-repository=GITHUB_REPOSITORY
          --github-workflow=GITHUB_WORKFLOW]
          | --jenkins-build-id=JENKINS_BUILD_ID
          --jenkins-build-tag=JENKINS_BUILD_TAG] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc artifact-guard operations describe

```text
NAME
    gcloud alpha scc artifact-guard operations describe - describe an artifact
        guard operation

SYNOPSIS
    gcloud alpha scc artifact-guard operations describe
        (OPERATION : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc artifact-guard policies create

```text
NAME
    gcloud alpha scc artifact-guard policies create - create a new artifact
        guard policy

SYNOPSIS
    gcloud alpha scc artifact-guard policies create
        (POLICY : --location=LOCATION --organization=ORGANIZATION)
        --policy-file-path=PATH_TO_FILE [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc artifact-guard policies delete

```text
NAME
    gcloud alpha scc artifact-guard policies delete - delete an artifact guard
        policy

SYNOPSIS
    gcloud alpha scc artifact-guard policies delete
        (POLICY : --location=LOCATION --organization=ORGANIZATION)
        [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc artifact-guard policies describe

```text
NAME
    gcloud alpha scc artifact-guard policies describe - describe an artifact
        guard policy

SYNOPSIS
    gcloud alpha scc artifact-guard policies describe
        (POLICY : --location=LOCATION --organization=ORGANIZATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc artifact-guard policies list

```text
NAME
    gcloud alpha scc artifact-guard policies list - list artifact guard
        policies

SYNOPSIS
    gcloud alpha scc artifact-guard policies list
        (PARENT : --organization=ORGANIZATION) [--filter=EXPRESSION]
        [--limit=LIMIT] [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha scc artifact-guard policies update

```text
NAME
    gcloud alpha scc artifact-guard policies update - update an existing
        artifact guard policy

SYNOPSIS
    gcloud alpha scc artifact-guard policies update
        (POLICY : --location=LOCATION --organization=ORGANIZATION)
        --policy-file-path=PATH_TO_FILE [--allow-missing]
        [--update-mask=UPDATE_MASK] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/scc/artifact-guard (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
