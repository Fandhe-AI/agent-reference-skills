---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/tpus/locations/describe
---

# gcloud compute tpus locations describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute tpus locations describe

```text
NAME
    gcloud compute tpus locations describe - describe a Cloud TPU Location

SYNOPSIS
    gcloud compute tpus locations describe [ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Describe a Cloud TPU Location.

    To get a list of available locations for your project run:

        $ gcloud compute tpus locations list

EXAMPLES
    The following command describes the TPUs running in zone us-central1-b:

        $ gcloud compute tpus locations describe us-central1-b

POSITIONAL ARGUMENTS
     Location resource - The Cloud TPU Location you want to describe. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument zone on the command line with a fully specified
        name;
      * set the property compute/zone with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     [ZONE]
        ID of the location or fully qualified identifier for the location.

        To set the zone attribute:
        * provide the argument zone on the command line;
        * set the property compute/zone.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the tpu/v1 API. The full documentation for this API can
    be found at: https://cloud.google.com/tpu/

NOTES
    These variants are also available:

        $ gcloud alpha compute tpus locations describe

        $ gcloud beta compute tpus locations describe
```

### gcloud beta compute tpus locations describe

```text
NAME
    gcloud beta compute tpus locations describe - describe a Cloud TPU Location

SYNOPSIS
    gcloud beta compute tpus locations describe [ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute tpus locations describe

```text
NAME
    gcloud alpha compute tpus locations describe - describe a Cloud TPU
        Location

SYNOPSIS
    gcloud alpha compute tpus locations describe [ZONE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/tpus/locations/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
