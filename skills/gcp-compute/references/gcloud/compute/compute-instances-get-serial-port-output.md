---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/get-serial-port-output
---

# gcloud compute instances get-serial-port-output

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute instances get-serial-port-output

```text
NAME
    gcloud compute instances get-serial-port-output - read output from a
        virtual machine instance's serial port

SYNOPSIS
    gcloud compute instances get-serial-port-output INSTANCE_NAME [--port=PORT]
        [--start=START] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute instances get-serial-port-output is used to get the output
    from a Compute Engine virtual machine's serial port. The serial port output
    from the virtual machine will be printed to standard output. This
    information can be useful for diagnostic purposes.

EXAMPLES
    To get the output from instance's serial port, run:

        $ gcloud compute instances get-serial-port-output example-instance \
            --zone=us-central1-b

POSITIONAL ARGUMENTS
     INSTANCE_NAME
        Name of the instance to operate on. For details on valid instance
        names, refer to the criteria documented under the field 'name' at:
        https://cloud.google.com/compute/docs/reference/rest/v1/instances

FLAGS
     --port=PORT
        Instances can support up to four serial port outputs, numbered 1
        through 4. By default, this command will return the output of the first
        serial port. Setting this flag will return the output of the requested
        serial port.

     --start=START
        Specifies the byte index (zero-based) of the first byte you want
        returned. Use this flag if you want to continue getting the output from
        a previous request that was too long to return in one attempt. The last
        byte returned in a request will be reported on STDERR.

     --zone=ZONE
        Zone of the instance to operate on. If not specified, you might be
        prompted to select a zone (interactive mode only). gcloud attempts to
        identify the appropriate zone by searching for resources in your
        currently active project. If the zone cannot be determined, gcloud
        prompts you for a selection with all available Google Cloud Platform
        zones.

        To avoid prompting when this flag is omitted, the user can set the
        compute/zone property:

            $ gcloud config set compute/zone ZONE

        A list of zones can be fetched by running:

            $ gcloud compute zones list

        To unset the property, run:

            $ gcloud config unset compute/zone

        Alternatively, the zone can be stored in the environment variable
        CLOUDSDK_COMPUTE_ZONE.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute instances get-serial-port-output

        $ gcloud beta compute instances get-serial-port-output
```

### gcloud beta compute instances get-serial-port-output

```text
NAME
    gcloud beta compute instances get-serial-port-output - read output from a
        virtual machine instance's serial port

SYNOPSIS
    gcloud beta compute instances get-serial-port-output INSTANCE_NAME
        [--port=PORT] [--start=START] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instances get-serial-port-output

```text
NAME
    gcloud alpha compute instances get-serial-port-output - read output from a
        virtual machine instance's serial port

SYNOPSIS
    gcloud alpha compute instances get-serial-port-output INSTANCE_NAME
        [--port=PORT] [--start=START] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/get-serial-port-output (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
