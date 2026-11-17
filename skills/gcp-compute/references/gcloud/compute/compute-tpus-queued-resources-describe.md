---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/tpus/queued-resources/describe
---

# gcloud compute tpus queued-resources describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute tpus queued-resources describe

```text
NAME
    gcloud compute tpus queued-resources describe - describe a Queued Resource

SYNOPSIS
    gcloud compute tpus queued-resources describe
        (QUEUED_RESOURCE : --zone=ZONE) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get details on a Queued Resource.

    To get a list of Queued Resources to describe in more detail, run:

        $ gcloud compute tpus queued-resources list

EXAMPLES
    To describe a Queued Resource with ID my-queued-resource in zone
    us-central1-b and project 'my-project', run:

        $ gcloud compute tpus queued-resources describe my-queued-resource \
            --zone=us-central1-b --project=my-project

POSITIONAL ARGUMENTS
     Queued resource resource - The Queued Resource you want to describe. The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument queued_resource on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       QUEUED_RESOURCE
          ID of the queued_resource or fully qualified identifier for the
          queued_resource.

          To set the queued_resource attribute:
          + provide the argument queued_resource on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          The compute/zone of the Cloud TPU.

          If not specified, will use default compute/zone.

          To set the zone attribute:
          + provide the argument queued_resource on the command line with a
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
    This command uses the tpu/v2 API. The full documentation for this API can
    be found at: https://cloud.google.com/tpu/

NOTES
    This variant is also available:

        $ gcloud alpha compute tpus queued-resources describe
```

### gcloud alpha compute tpus queued-resources describe

```text
NAME
    gcloud alpha compute tpus queued-resources describe - describe a Queued
        Resource

SYNOPSIS
    gcloud alpha compute tpus queued-resources describe
        (QUEUED_RESOURCE : --zone=ZONE) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/tpus/queued-resources/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
