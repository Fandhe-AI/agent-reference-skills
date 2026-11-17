---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/tpus/tpu-vm/service-identity
---

# gcloud compute tpus tpu-vm service-identity

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute tpus tpu-vm service-identity create

```text
NAME
    gcloud compute tpus tpu-vm service-identity create - create a Cloud TPU VM
        service identity for a project

SYNOPSIS
    gcloud compute tpus tpu-vm service-identity create [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Cloud TPU VM service identity for a project.

    The Cloud TPU VM creates a service identity (Google-owned service account)
    for management of resources when the first Cloud TPU VM is created in a
    project after TPU service activation. However, there are cases where the
    service identity may need to be created beforehand to grant specific IAM
    permissions to it, like access to a Google Cloud Storage bucket. This
    method generates the service account without need to first create a Cloud
    TPU VM.

    This command generates a service identity valid for Cloud TPU VMs across
    all zones in a project. The zone is required (either set in the gcloud
    config defaults, as an environment variable, or --zone flag), but the
    service identity generated will work across all Cloud TPU VM zones.

EXAMPLES
    To generate a Cloud TPU VM service identity for a project (using zone
    europe-west4-a), run:

        $ gcloud compute tpus tpu-vm service-identity create \
            --zone=europe-west4-a

FLAGS
     Location resource - Zone to use for the request.

     If not specified, will use the value of the [compute/zone] property in the
     current gcloud configuration. This represents a Cloud resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument --zone on the command line with a fully
        specified name;
      * set the property compute/zone with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --zone=ZONE
        ID of the location or fully qualified identifier for the location.

        To set the zone attribute:
        * provide the argument --zone on the command line;
        * set the property compute/zone.

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

        $ gcloud alpha compute tpus tpu-vm service-identity create
```

### gcloud alpha compute tpus tpu-vm service-identity create

```text
NAME
    gcloud alpha compute tpus tpu-vm service-identity create - create a Cloud
        TPU VM service identity for a project

SYNOPSIS
    gcloud alpha compute tpus tpu-vm service-identity create [--zone=ZONE]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/tpus/tpu-vm/service-identity (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
