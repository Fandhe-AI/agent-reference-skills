---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/forwarding-rules/import
---

# gcloud compute forwarding-rules import

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute forwarding-rules import

```text
NAME
    gcloud compute forwarding-rules import - import a forwarding rule

SYNOPSIS
    gcloud compute forwarding-rules import NAME [--source=SOURCE]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Imports a forwarding rule's configuration from a file.

EXAMPLES
    Import a forwarding rule by running:

        $ gcloud compute forwarding-rules import NAME --source=<path-to-file>

POSITIONAL ARGUMENTS
     NAME
        Name of the forwarding rule to import.

FLAGS
     --source=SOURCE
        Path to a YAML file containing configuration export data.
        Alternatively, you may omit this flag to read from standard input. For
        a schema describing the export/import format, see:
        $CLOUDSDKROOT/lib/googlecloudsdk/schemas/compute/v1/ForwardingRule.yaml.

            Note: $CLOUDSDKROOT represents the Google Cloud CLI's installation directory.

     At most one of these can be specified:

       --global
          If set, the forwarding rule is global.

       --region=REGION
          Region of the forwarding rule to import. If not specified, you might
          be prompted to select a region (interactive mode only).

          To avoid prompting when this flag is omitted, you can set the
          compute/region property:

              $ gcloud config set compute/region REGION

          A list of regions can be fetched by running:

              $ gcloud compute regions list

          To unset the property, run:

              $ gcloud config unset compute/region

          Alternatively, the region can be stored in the environment variable
          CLOUDSDK_COMPUTE_REGION.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute forwarding-rules import

        $ gcloud beta compute forwarding-rules import
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud compute forwarding-rules import NAME \
    --source=PATH_TO_FILE
```

### gcloud beta compute forwarding-rules import

```text
NAME
    gcloud beta compute forwarding-rules import - import a forwarding rule

SYNOPSIS
    gcloud beta compute forwarding-rules import NAME [--source=SOURCE]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute forwarding-rules import

```text
NAME
    gcloud alpha compute forwarding-rules import - import a forwarding rule

SYNOPSIS
    gcloud alpha compute forwarding-rules import NAME [--source=SOURCE]
        [--global | --region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): angle-bracket placeholders such as `<service-name>` are shell redirections when pasted into bash; the runnable form writes them as upper-case placeholders (`SERVICE_NAME`).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/forwarding-rules/import (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
