---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/dataplex/entry-links
---

# gcloud dataplex entry-links

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha dataplex entry-links create

```text
NAME
    gcloud alpha dataplex entry-links create - create a Dataplex Entry Link

SYNOPSIS
    gcloud alpha dataplex entry-links create
        (ENTRY_LINK : --entry-group=ENTRY_GROUP --location=LOCATION)
        --entry-link-type=ENTRY_LINK_TYPE --entry-references=ENTRY_REFERENCES
        [--aspects=YAML_OR_JSON_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex entry-links delete

```text
NAME
    gcloud alpha dataplex entry-links delete - delete a Dataplex entryLink

SYNOPSIS
    gcloud alpha dataplex entry-links delete
        (ENTRY_LINK : --entry-group=ENTRY_GROUP --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex entry-links describe

```text
NAME
    gcloud alpha dataplex entry-links describe - describe a Dataplex entry link

SYNOPSIS
    gcloud alpha dataplex entry-links describe
        (ENTRY_LINK : --entry_group=ENTRY_GROUP --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex entry-links update

```text
NAME
    gcloud alpha dataplex entry-links update - update a Dataplex Entry Link

SYNOPSIS
    gcloud alpha dataplex entry-links update
        (ENTRY_LINK : --entry-group=ENTRY_GROUP --location=LOCATION)
        [--update-aspects=YAML_OR_JSON_FILE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex entry-links update-aspects

```text
NAME
    gcloud alpha dataplex entry-links update-aspects - add or update one aspect
        for a Dataplex Entry Link

SYNOPSIS
    gcloud alpha dataplex entry-links update-aspects
        (ENTRY_LINK : --entry-group=ENTRY_GROUP --location=LOCATION)
        --aspects=YAML_OR_JSON_FILE [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/dataplex/entry-links (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
