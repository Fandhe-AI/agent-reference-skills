---
source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/app/migrate-config
---

# gcloud app migrate-config

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud beta app migrate-config cron-xml-to-yaml

```text
NAME
    gcloud beta app migrate-config cron-xml-to-yaml - translates a cron.xml
        into cron.yaml

SYNOPSIS
    gcloud beta app migrate-config cron-xml-to-yaml XML_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app migrate-config datastore-indexes-xml-to-yaml

```text
NAME
    gcloud beta app migrate-config datastore-indexes-xml-to-yaml - translates a
        datastore-indexes.xml into index.yaml

SYNOPSIS
    gcloud beta app migrate-config datastore-indexes-xml-to-yaml XML_FILE
        [--generated-indexes-file=GENERATED_INDEXES_FILE]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app migrate-config dispatch-xml-to-yaml

```text
NAME
    gcloud beta app migrate-config dispatch-xml-to-yaml - translates a
        dispatch.xml into dispatch.yaml

SYNOPSIS
    gcloud beta app migrate-config dispatch-xml-to-yaml XML_FILE
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud beta app migrate-config queue-xml-to-yaml

```text
NAME
    gcloud beta app migrate-config queue-xml-to-yaml - translates a queue.xml
        into queue.yaml

SYNOPSIS
    gcloud beta app migrate-config queue-xml-to-yaml XML_FILE
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/beta/app/migrate-config (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
