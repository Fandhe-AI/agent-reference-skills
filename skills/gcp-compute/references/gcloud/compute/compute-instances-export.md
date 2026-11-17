---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/export
---

# gcloud compute instances export

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute instances export

```text
NAME
    gcloud compute instances export - export a Compute Engine virtual machine
        instance's configuration to a file

SYNOPSIS
    gcloud compute instances export (INSTANCE : --zone=ZONE)
        [--destination=DESTINATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Export a Compute Engine virtual machine instance's configuration to a file.

EXAMPLES
    A virtual machine can be exported by running:

        $ gcloud compute instances export my-instance \
            --destination=<path-to-file>

POSITIONAL ARGUMENTS
     Instance resource - Name of the instance to export. For details on valid
     instance names, refer to the criteria documented under the field 'name'
     at: https://cloud.google.com/compute/docs/reference/rest/v1/instances The
     arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

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
          The name of the Google Compute Engine zone.

          To set the zone attribute:
          + provide the argument instance on the command line with a fully
            specified name;
          + provide the argument --zone on the command line;
          + set the property compute/zone.

FLAGS
     --destination=DESTINATION
        Path to a YAML file where the configuration will be exported. The
        exported data will not contain any output-only fields. Alternatively,
        you may omit this flag to write to standard output. For a schema
        describing the export/import format, see
        $CLOUDSDKROOT/lib/googlecloudsdk/schemas/...

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the compute/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/compute/

NOTES
    These variants are also available:

        $ gcloud alpha compute instances export

        $ gcloud beta compute instances export
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud compute instances export my-instance \
    --destination=PATH_TO_FILE
```

### gcloud beta compute instances export

```text
NAME
    gcloud beta compute instances export - export a Compute Engine virtual
        machine instance's configuration to a file

SYNOPSIS
    gcloud beta compute instances export (INSTANCE : --zone=ZONE)
        [--destination=DESTINATION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instances export

```text
NAME
    gcloud alpha compute instances export - export a Compute Engine virtual
        machine instance's configuration to a file

SYNOPSIS
    gcloud alpha compute instances export (INSTANCE : --zone=ZONE)
        [--destination=DESTINATION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): angle-bracket placeholders such as `<service-name>` are shell redirections when pasted into bash; the runnable form writes them as upper-case placeholders (`SERVICE_NAME`).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/export (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
