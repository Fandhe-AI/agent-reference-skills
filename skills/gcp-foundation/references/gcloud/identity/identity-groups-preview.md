---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/identity/groups/preview
---

# gcloud identity groups preview

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta identity groups preview

```text
NAME
    gcloud beta identity groups preview - retrieve a list of users in a
        customer account using CEL query

SYNOPSIS
    gcloud beta identity groups preview --customer=CUSTOMER
        [--custom-field-mask=[custom-mask,...]]
        [--max-results=MAX_RESULTS; default=100] [--page-token=PAGE_TOKEN]
        [--projection=PROJECTION; default="basic"] [--query=QUERY]
        [--view-type=VIEW_TYPE; default="admin-view"] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha identity groups preview

```text
NAME
    gcloud alpha identity groups preview - retrieve a list of users in a
        customer account using CEL query

SYNOPSIS
    gcloud alpha identity groups preview --customer=CUSTOMER
        [--custom-field-mask=[custom-mask,...]]
        [--max-results=MAX_RESULTS; default=100] [--page-token=PAGE_TOKEN]
        [--projection=PROJECTION; default="basic"] [--query=QUERY]
        [--view-type=VIEW_TYPE; default="admin-view"] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/identity/groups/preview (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
