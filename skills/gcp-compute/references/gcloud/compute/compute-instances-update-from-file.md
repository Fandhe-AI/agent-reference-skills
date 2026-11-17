---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/update-from-file
---

# gcloud compute instances update-from-file

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute instances update-from-file

```text
NAME
    gcloud compute instances update-from-file - update a Compute Engine virtual
        machine instance using a configuration file

SYNOPSIS
    gcloud compute instances update-from-file INSTANCE_NAME
        [--discard-local-ssd] [--minimal-action=MINIMAL_ACTION]
        [--most-disruptive-allowed-action=MOST_DISRUPTIVE_ALLOWED_ACTION]
        [--source=SOURCE] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Compute Engine virtual machine instance using a configuration
    file. For more information, see
    https://cloud.google.com/compute/docs/instances/update-instance-properties.

EXAMPLES
    A virtual machine instance can be updated by running:

        $ gcloud compute instances update-from-file my-instance \
            --source=<path-to-file>

POSITIONAL ARGUMENTS
     INSTANCE_NAME
        Name of the instance to update. For details on valid instance names,
        refer to the criteria documented under the field 'name' at:
        https://cloud.google.com/compute/docs/reference/rest/v1/instances

FLAGS
     --discard-local-ssd
        If specified, all local SSDs data attached to this instance will be
        discarded. This is only used with most-disruptive-allowed-action set to
        RESTART.

     --minimal-action=MINIMAL_ACTION
        If specified, this action or higher level action is performed on the
        instance irrespective of what action is required for the update to take
        effect. If not specified, then Compute Engine acts based on the minimum
        action required.

     --most-disruptive-allowed-action=MOST_DISRUPTIVE_ALLOWED_ACTION
        If specified, Compute Engine returns an error if the update requires a
        higher action to be applied to the instance. If not specified, the
        default will be REFRESH.

     --source=SOURCE
        Path to a YAML file containing configuration export data.
        Alternatively, you may omit this flag to read from standard input. For
        a schema describing the export/import format, see:
        $CLOUDSDKROOT/lib/googlecloudsdk/schemas/compute/v1/Instance.yaml.

            Note: $CLOUDSDKROOT represents the Google Cloud CLI's installation directory.

     --zone=ZONE
        Zone of the instance to update. If not specified, you might be prompted
        to select a zone (interactive mode only). gcloud attempts to identify
        the appropriate zone by searching for resources in your currently
        active project. If the zone cannot be determined, gcloud prompts you
        for a selection with all available Google Cloud Platform zones.

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

        $ gcloud alpha compute instances update-from-file

        $ gcloud beta compute instances update-from-file
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud compute instances update-from-file my-instance \
    --source=PATH_TO_FILE
```

### gcloud beta compute instances update-from-file

```text
NAME
    gcloud beta compute instances update-from-file - update a Compute Engine
        virtual machine instance using a configuration file

SYNOPSIS
    gcloud beta compute instances update-from-file INSTANCE_NAME
        [--discard-local-ssd] [--minimal-action=MINIMAL_ACTION]
        [--most-disruptive-allowed-action=MOST_DISRUPTIVE_ALLOWED_ACTION]
        [--source=SOURCE] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute instances update-from-file

```text
NAME
    gcloud alpha compute instances update-from-file - update a Compute Engine
        virtual machine instance using a configuration file

SYNOPSIS
    gcloud alpha compute instances update-from-file INSTANCE_NAME
        [--clear-secure-tag] [--discard-local-ssd]
        [--minimal-action=MINIMAL_ACTION]
        [--most-disruptive-allowed-action=MOST_DISRUPTIVE_ALLOWED_ACTION]
        [--source=SOURCE] [--zone=ZONE] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): angle-bracket placeholders such as `<service-name>` are shell redirections when pasted into bash; the runnable form writes them as upper-case placeholders (`SERVICE_NAME`).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/update-from-file (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
