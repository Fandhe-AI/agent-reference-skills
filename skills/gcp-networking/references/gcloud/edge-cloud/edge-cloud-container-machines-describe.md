---
source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/container/machines/describe
---

# gcloud edge-cloud container machines describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud edge-cloud container machines describe

```text
NAME
    gcloud edge-cloud container machines describe - show details about the
        machine

SYNOPSIS
    gcloud edge-cloud container machines describe
        (MACHINE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Show details about the machine.

EXAMPLES
    To show details about a machine called 'my-machine' in region us-central1,
    run:

        $ gcloud edge-cloud container machines describe my-machine \
            --location=us-central1

POSITIONAL ARGUMENTS
     Machine resource - The machine you want to describe. The arguments in this
     group can be used to specify the attributes of this resource. (NOTE) Some
     attributes are not given arguments in this group but can be set in other
     ways.

     To set the project attribute:
      * provide the argument machine on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       MACHINE
          ID of the machine or fully qualified identifier for the machine.

          To set the machine attribute:
          + provide the argument machine on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The global location name.

          To set the location attribute:
          + provide the argument machine on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property edge_container/location.

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

        $ gcloud alpha edge-cloud container machines describe
```

### gcloud alpha edge-cloud container machines describe

```text
NAME
    gcloud alpha edge-cloud container machines describe - show details about
        the machine

SYNOPSIS
    gcloud alpha edge-cloud container machines describe
        (MACHINE : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/container/machines/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
