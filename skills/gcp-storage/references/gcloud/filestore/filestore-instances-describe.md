---
source: https://docs.cloud.google.com/sdk/gcloud/reference/filestore/instances/describe
---

# gcloud filestore instances describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud filestore instances describe

```text
NAME
    gcloud filestore instances describe - show metadata for a Filestore
        instance

SYNOPSIS
    gcloud filestore instances describe (INSTANCE : --zone=ZONE)
        [--location=LOCATION] [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show metadata for a Filestore instance.

EXAMPLES
    The following command shows the metadata for the Filestore instance named
    NAME in us-central1-c.

        $ gcloud filestore instances describe NAME --location=us-central1-c

POSITIONAL ARGUMENTS
     Instance resource - The instance to describe. The arguments in this group
     can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument instance on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       INSTANCE
          ID of the instance or fully qualified identifier for the instance.

          To set the instance attribute:
          + provide the argument instance on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --zone=ZONE
          The zone of the instance.

          To set the zone attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --zone on the command line;
          + provide the argument region on the command line;
          + provide the argument location on the command line;
          + set the property filestore/zone;
          + set the property filestore/region;
          + set the property filestore/location.

FLAGS
     --location=LOCATION
        Location of the Cloud Filestore instance/operation.

     --region=REGION
        Region of the Cloud Filestore instance.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha filestore instances describe

        $ gcloud beta filestore instances describe
```

### gcloud beta filestore instances describe

```text
NAME
    gcloud beta filestore instances describe - show metadata for a Filestore
        instance

SYNOPSIS
    gcloud beta filestore instances describe (INSTANCE : --zone=ZONE)
        [--location=LOCATION] [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha filestore instances describe

```text
NAME
    gcloud alpha filestore instances describe - show metadata for a Filestore
        instance

SYNOPSIS
    gcloud alpha filestore instances describe (INSTANCE : --zone=ZONE)
        [--location=LOCATION] [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/filestore/instances/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
