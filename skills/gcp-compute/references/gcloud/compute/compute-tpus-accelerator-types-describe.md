---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/tpus/accelerator-types/describe
---

# gcloud compute tpus accelerator-types describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute tpus accelerator-types describe

```text
NAME
    gcloud compute tpus accelerator-types describe - describe an accelerator
        type available for Cloud TPUs

SYNOPSIS
    gcloud compute tpus accelerator-types describe
        (ACCELERATOR_TYPE : --zone=ZONE) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get details on an accelerator type.

    To get a list of available accelerator types for your location run:

        $ gcloud compute tpus accelerator-types list

EXAMPLES
    The following command describes the v3-8 accelerator types running in zone
    us-central1-b:

        $ gcloud compute tpus accelerator-types describe v3-8 \
            --zone=us-central1-b

POSITIONAL ARGUMENTS
     Accelerator type resource - The accelerator type you want to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument accelerator_type on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       ACCELERATOR_TYPE
          ID of the accelerator_type or fully qualified identifier for the
          accelerator_type.

          To set the accelerator_type attribute:
          + provide the argument accelerator_type on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          The compute/zone of the Cloud TPU.

          If not specified, will use default compute/zone.

          To set the zone attribute:
          + provide the argument accelerator_type on the command line with a
            fully specified name;
          + provide the argument --zone on the command line;
          + set the property compute/zone.

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

        $ gcloud alpha compute tpus accelerator-types describe

        $ gcloud beta compute tpus accelerator-types describe
```

### gcloud beta compute tpus accelerator-types describe

```text
NAME
    gcloud beta compute tpus accelerator-types describe - describe an
        accelerator type available for Cloud TPUs

SYNOPSIS
    gcloud beta compute tpus accelerator-types describe
        (ACCELERATOR_TYPE : --zone=ZONE) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute tpus accelerator-types describe

```text
NAME
    gcloud alpha compute tpus accelerator-types describe - describe an
        accelerator type available for Cloud TPUs

SYNOPSIS
    gcloud alpha compute tpus accelerator-types describe
        (ACCELERATOR_TYPE : --zone=ZONE) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/tpus/accelerator-types/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
