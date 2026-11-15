---
source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/accessibility
---

# gcloud topic accessibility

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud topic accessibility

```text
NAME
    gcloud topic accessibility - reference for Accessibility features

DESCRIPTION
    The accessibility/screen_reader property when set to true will change some
    behavior to make gcloud more screen reader friendly. Currently the
    following changes are implemented:

      o For progress trackers, instead of unicode spinners, the phrase
        'working' is displayed on stderr, every second while gcloud is working.
      o For progress bars, progress is displayed as a percentage, outputted
        to stderr.
      o For boxed tables, instead of the queried resources being displayed in
        tables drawn in Unicode, results are rendered as a flattened list of
        items. Also consider using the --format flag to define your own format.

    To turn this on, run:

        $ gcloud config set accessibility/screen_reader true

    Accessibility support is still in early stages. Please report any issues
    that you would like fixed using gcloud feedback.

NOTES
    These variants are also available:

        $ gcloud alpha topic accessibility

        $ gcloud beta topic accessibility
```

### gcloud beta topic accessibility

```text
NAME
    gcloud beta topic accessibility - reference for Accessibility features
```

### gcloud alpha topic accessibility

```text
NAME
    gcloud alpha topic accessibility - reference for Accessibility features
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/topic/accessibility (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
