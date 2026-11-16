---
source: https://docs.cloud.google.com/sdk/gcloud/reference/datastore/import
---

# gcloud datastore import

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud datastore import

```text
NAME
    gcloud datastore import - import Cloud Datastore entities from Google Cloud
        Storage

SYNOPSIS
    gcloud datastore import INPUT_URL [--async] [--kinds=[KIND,...]]
        [--namespaces=[NAMESPACE,...]]
        [--operation-labels=[OPERATION_LABEL,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Imports entities into Google Cloud Datastore. Existing entities with the
    same key are overwritten. The import occurs in the background and its
    progress can be monitored and managed via the Operation resource that is
    created. If an Import operation is cancelled, it is possible that a subset
    of the data has already been imported to Cloud Datastore. This data will
    not be removed.

EXAMPLES
    To import all data exported to the output URL
    gs://exampleBucket/exampleExport/exampleExport.overall_export_metadata,
    run:

        $ gcloud datastore import \
            gs://exampleBucket/exampleExport/\
        exampleExport.overall_export_metadata

    To import all data exported to the output URL
    gs://exampleBucket/exampleExport/exampleExport.overall_export_metadata
    without waiting for the operation to complete, run:

        $ gcloud datastore import \
            gs://exampleBucket/exampleExport/\
        exampleExport.overall_export_metadata --async

    To import only the exampleKind from the data exported to the output URL
    gs://exampleBucket/exampleExport/exampleExport.overall_export_metadata,
    run:

        $ gcloud datastore import \
            gs://exampleBucket/exampleExport/\
        exampleExport.overall_export_metadata --kinds='exampleKind'

POSITIONAL ARGUMENTS
     INPUT_URL
        Location of the import metadata. Must be a valid Google Cloud Storage
        object. The file extension is 'overall_export_metadata'.

        This location is the 'output_url' field of a previous export, and can
        be found via the 'operations describe' command.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --kinds=[KIND,...]
        A list specifying what kinds will be included in the operation. When
        omitted, all Kinds are included. For example, to operate on only the
        'Customer' and 'Order' Kinds:

            $ gcloud datastore import --kinds='Customer','Order'

     --namespaces=[NAMESPACE,...]
        A list specifying what namespaces will be included in the operation.
        When omitted, all namespaces are included in the operation, including
        the default namespace. To specify that only the default namespace
        should be operated on, use the special symbol '(default)'. For example,
        to operate on entities from both the 'customers' and default
        namespaces:

            $ gcloud datastore import --namespaces='(default)','customers'

     --operation-labels=[OPERATION_LABEL,...]
        A string:string map of custom labels to associate with this operation.
        For example:

            $ gcloud datastore import \
                --operation-labels=comment='customer orders','sales rep'=pending

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha datastore import

        $ gcloud beta datastore import
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud datastore import gs://exampleBucket/exampleExport/exampleExport.overall_export_metadata

gcloud datastore import gs://exampleBucket/exampleExport/exampleExport.overall_export_metadata \
    --async

gcloud datastore import gs://exampleBucket/exampleExport/exampleExport.overall_export_metadata \
    --kinds='exampleKind'
```

### gcloud beta datastore import

```text
NAME
    gcloud beta datastore import - import Cloud Datastore entities from Google
        Cloud Storage

SYNOPSIS
    gcloud beta datastore import INPUT_URL [--async] [--kinds=[KIND,...]]
        [--namespaces=[NAMESPACE,...]]
        [--operation-labels=[OPERATION_LABEL,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha datastore import

```text
NAME
    gcloud alpha datastore import - import Cloud Datastore entities from Google
        Cloud Storage

SYNOPSIS
    gcloud alpha datastore import INPUT_URL [--async] [--kinds=[KIND,...]]
        [--namespaces=[NAMESPACE,...]]
        [--operation-labels=[OPERATION_LABEL,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/datastore/import (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
