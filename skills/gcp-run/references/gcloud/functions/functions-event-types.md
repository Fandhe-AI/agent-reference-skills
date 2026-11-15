---
source: https://docs.cloud.google.com/sdk/gcloud/reference/functions/event-types
---

# gcloud functions event-types

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud functions event-types list

```text
NAME
    gcloud functions event-types list - list types of events that can be a
        trigger for a Google Cloud Function

SYNOPSIS
    gcloud functions event-types list [--gen2] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud functions event-types list displays types of events that can be a
    trigger for a Google Cloud Function.

      o For an event type, EVENT_TYPE_DEFAULT marks whether the given event
        type is the default (in which case the --trigger-event flag may be
        omitted).
      o For a resource, RESOURCE_OPTIONAL marks whether the resource has a
        corresponding default value (in which case the --trigger-resource flag
        may be omitted).

FLAGS
     --gen2
        If enabled, this command will use Cloud Functions (Second generation).
        If disabled with --no-gen2, Cloud Functions (First generation) will be
        used. If not specified, the value of this flag will be taken from the
        functions/gen2 configuration property.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha functions event-types list

        $ gcloud beta functions event-types list
```

### gcloud beta functions event-types list

```text
NAME
    gcloud beta functions event-types list - list types of events that can be a
        trigger for a Google Cloud Function

SYNOPSIS
    gcloud beta functions event-types list [--gen2] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha functions event-types list

```text
NAME
    gcloud alpha functions event-types list - list types of events that can be
        a trigger for a Google Cloud Function

SYNOPSIS
    gcloud alpha functions event-types list [--gen2] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/functions/event-types (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
