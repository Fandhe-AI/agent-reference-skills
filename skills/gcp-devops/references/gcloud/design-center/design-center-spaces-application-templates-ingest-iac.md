---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/design-center/spaces/application-templates/ingest-iac
---

# gcloud design-center spaces application-templates ingest-iac

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha design-center spaces application-templates ingest-iac

```text
NAME
    gcloud alpha design-center spaces application-templates ingest-iac - ingest
        Infrastructure as Code (IaC) for an application template

SYNOPSIS
    gcloud alpha design-center spaces application-templates ingest-iac
        (APPLICATION_TEMPLATE : --location=LOCATION --space=SPACE)
        (--gcs-uri=GCS_URI | --iac-module-from-file=PATH_TO_FILE
          | --developer-connect-dir=DEVELOPER_CONNECT_DIR
          --developer-connect-repo-uri=DEVELOPER_CONNECT_REPO_URI
          (--developer-connect-branch=DEVELOPER_CONNECT_BRANCH
          | --developer-connect-commit-sha=DEVELOPER_CONNECT_COMMIT_SHA
          | --developer-connect-ref-tag=DEVELOPER_CONNECT_REF_TAG)
          | [--git-source-ref-tag=GIT_SOURCE_REF_TAG
          --git-source-repo=GIT_SOURCE_REPO : --git-source-dir=GIT_SOURCE_DIR])
        [--async] [--raw-terraform-import-enabled]
        [--validate-catalog-compatibility] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/design-center/spaces/application-templates/ingest-iac (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
