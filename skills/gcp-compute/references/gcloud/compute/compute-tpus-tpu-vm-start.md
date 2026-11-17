---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/tpus/tpu-vm/start
---

# gcloud compute tpus tpu-vm start

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute tpus tpu-vm start

```text
NAME
    gcloud compute tpus tpu-vm start - start a Cloud TPU VM node

SYNOPSIS
    gcloud compute tpus tpu-vm start (TPU : --zone=ZONE) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Start a Cloud TPU VM node.

EXAMPLES
    To start a Cloud TPU VM node with ID my-tpu in zone us-central1-b, run:

        $ gcloud compute tpus tpu-vm start my-tpu --zone=us-central1-b

POSITIONAL ARGUMENTS
     Tpu resource - Name of the Cloud TPU VM node to start. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument tpu on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       TPU
          ID of the tpu or fully qualified identifier for the tpu.

          To set the tpu attribute:
          + provide the argument tpu on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          Zone of the Cloud TPU.

          If not specified, will use default compute/zone.

          To set the zone attribute:
          + provide the argument tpu on the command line with a fully
            specified name;
          + provide the argument --zone on the command line;
          + set the property compute/zone.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the tpu/v2 API. The full documentation for this API can
    be found at: https://cloud.google.com/tpu/

NOTES
    This variant is also available:

        $ gcloud alpha compute tpus tpu-vm start
```

### gcloud alpha compute tpus tpu-vm start

```text
NAME
    gcloud alpha compute tpus tpu-vm start - start a Cloud TPU VM node

SYNOPSIS
    gcloud alpha compute tpus tpu-vm start (TPU : --zone=ZONE) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/tpus/tpu-vm/start (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
