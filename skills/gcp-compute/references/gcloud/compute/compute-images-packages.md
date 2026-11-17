---
source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/compute/images/packages
---

# gcloud compute images packages

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud alpha compute images packages diff

```text
NAME
    gcloud alpha compute images packages diff - displays the version
        differences of packages between two images

SYNOPSIS
    gcloud alpha compute images packages diff
        (--base-image=BASE_IMAGE : --base-project=BASE_PROJECT)
        (--diff-image=DIFF_IMAGE : --diff-project=DIFF_PROJECT)
        [--show-added-packages] [--show-removed-packages]
        [--show-updated-packages] [--filter=EXPRESSION] [--limit=LIMIT]
        [--page-size=PAGE_SIZE] [--sort-by=[FIELD,...]] [--uri]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute images packages list

```text
NAME
    gcloud alpha compute images packages list - list the packages in an image

SYNOPSIS
    gcloud alpha compute images packages list --image=IMAGE
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/alpha/compute/images/packages (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
