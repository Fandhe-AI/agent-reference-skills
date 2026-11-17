---
source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/container/zones/describe
---

# gcloud edge-cloud container zones describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud edge-cloud container zones describe

```text
NAME
    gcloud edge-cloud container zones describe - describe an Edge Container
        zone

SYNOPSIS
    gcloud edge-cloud container zones describe ZONE [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe an Edge Container zone.

EXAMPLES
    To display the metadata for the zone us-central1-edge-operator-a, run:

        $ gcloud edge-cloud container zones describe \
            us-central1-edge-operator-a

POSITIONAL ARGUMENTS
     Zone resource - The zone name. This represents a Cloud resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument zone on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ZONE
          ID of the zone or fully qualified identifier for the zone.

          To set the zone attribute:
          + provide the argument zone on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the edgecontainer/v1 API. The full documentation for this
    API can be found at: https://cloud.google.com/edge-cloud

NOTES
    This variant is also available:

        $ gcloud alpha edge-cloud container zones describe
```

### gcloud alpha edge-cloud container zones describe

```text
NAME
    gcloud alpha edge-cloud container zones describe - describe an Edge
        Container zone

SYNOPSIS
    gcloud alpha edge-cloud container zones describe ZONE
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/container/zones/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
