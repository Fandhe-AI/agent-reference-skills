---
source: https://docs.cloud.google.com/sdk/gcloud/reference/datastore/export
---

# gcloud datastore export

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud datastore export

```text
NAME
    gcloud datastore export - export Cloud Datastore entities to Google Cloud
        Storage

SYNOPSIS
    gcloud datastore export OUTPUT_URL_PREFIX [--async] [--kinds=[KIND,...]]
        [--namespaces=[NAMESPACE,...]]
        [--operation-labels=[OPERATION_LABEL,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Export a copy of all or a subset of entities from Google Cloud Datastore to
    another storage system, such as Google Cloud Storage. Recent updates to
    entities may not be reflected in the export. The export occurs in the
    background and its progress can be monitored and managed via the operation
    commands. The output of an export may only be used once the operation has
    completed. If an export operation is cancelled before completion then it
    may leave partial data behind in Google Cloud Storage.

EXAMPLES
    To export all kinds in the exampleNs namespace in the exampleProject
    project to the exampleBucket, run:

        $ gcloud datastore export gs://exampleBucket \
            --namespaces='exampleNs' --project='exampleProject'

    To export the exampleKind and otherKind kinds in the exampleNs namespace in
    the exampleProject project to the exampleBucket, run:

        $ gcloud datastore export gs://exampleBucket \
            --kinds='exampleKind,otherKind' --namespaces='exampleNs' \
            --project='exampleProject'

    To export all namespaces and kinds in the currently set project to the
    exampleBucket without waiting for the operation to complete, run:

        $ gcloud datastore export gs://exampleBucket --async

    To export the exampleKind in all namespaces in the currently set project to
    the exampleBucket, and output the result in JSON, run:

        $ gcloud datastore export gs://exampleBucket --kinds='exampleKind' \
            --format=json

POSITIONAL ARGUMENTS
     OUTPUT_URL_PREFIX
        Location for the export metadata and data files. Must be a valid Google
        Cloud Storage bucket with an optional path prefix. For example:

            $ gcloud datastore export gs://mybucket/my/path

        Will place the export in the mybucket bucket in objects prefixed with
        my/path.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --kinds=[KIND,...]
        A list specifying what kinds will be included in the operation. When
        omitted, all Kinds are included. For example, to operate on only the
        'Customer' and 'Order' Kinds:

            $ gcloud datastore export --kinds='Customer','Order'

     --namespaces=[NAMESPACE,...]
        A list specifying what namespaces will be included in the operation.
        When omitted, all namespaces are included in the operation, including
        the default namespace. To specify that only the default namespace
        should be operated on, use the special symbol '(default)'. For example,
        to operate on entities from both the 'customers' and default
        namespaces:

            $ gcloud datastore export --namespaces='(default)','customers'

     --operation-labels=[OPERATION_LABEL,...]
        A string:string map of custom labels to associate with this operation.
        For example:

            $ gcloud datastore export \
                --operation-labels=comment='customer orders','sales rep'=pending

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha datastore export

        $ gcloud beta datastore export
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud datastore export gs://exampleBucket \
    --namespaces='exampleNs' \
    --project='example-project'

gcloud datastore export gs://exampleBucket \
    --kinds='exampleKind,otherKind' \
    --namespaces='exampleNs' \
    --project='example-project'
```

### gcloud beta datastore export

```text
NAME
    gcloud beta datastore export - export Cloud Datastore entities to Google
        Cloud Storage

SYNOPSIS
    gcloud beta datastore export OUTPUT_URL_PREFIX [--async]
        [--kinds=[KIND,...]] [--namespaces=[NAMESPACE,...]]
        [--operation-labels=[OPERATION_LABEL,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha datastore export

```text
NAME
    gcloud alpha datastore export - export Cloud Datastore entities to Google
        Cloud Storage

SYNOPSIS
    gcloud alpha datastore export OUTPUT_URL_PREFIX [--async]
        [--kinds=[KIND,...]] [--namespaces=[NAMESPACE,...]]
        [--operation-labels=[OPERATION_LABEL,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the examples pass `--project='exampleProject'`, which gcloud 593.0.0 rejects ("[exampleProject] is not a valid project ID"; project IDs use lower-case letters, digits and hyphens); the runnable form uses `example-project`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/datastore/export (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
