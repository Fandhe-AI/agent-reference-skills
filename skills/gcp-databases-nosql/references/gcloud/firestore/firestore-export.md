---
source: https://docs.cloud.google.com/sdk/gcloud/reference/firestore/export
---

# gcloud firestore export

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud firestore export

```text
NAME
    gcloud firestore export - export Cloud Firestore documents to Google Cloud
        Storage

SYNOPSIS
    gcloud firestore export OUTPUT_URI_PREFIX [--async]
        [--collection-ids=[COLLECTION_GROUP_IDS,...]]
        [--database=DATABASE; default="(default)"]
        [--namespace-ids=[NAMESPACE_IDS,...]] [--snapshot-time=SNAPSHOT_TIME]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    export Cloud Firestore documents to Google Cloud Storage.

EXAMPLES
    To export all collection groups to mybucket in objects prefixed with
    my/path, run:

        $ gcloud firestore export gs://mybucket/my/path

    To export a specific set of collections groups asynchronously, run:

        $ gcloud firestore export gs://mybucket/my/path \
            --collection-ids='specific collection group1','specific
         collection group2' --async

    To export all collection groups from certain namespace, run:

        $ gcloud firestore export gs://mybucket/my/path \
            --namespace-ids='specific namespace id'

    To export from a snapshot at '2023-05-26T10:20:00.00Z', run:

        $ gcloud firestore export gs://mybucket/my/path \
            --snapshot-time='2023-05-26T10:20:00.00Z'

POSITIONAL ARGUMENTS
     OUTPUT_URI_PREFIX
        Location where the export files will be stored. Must be a valid Google
        Cloud Storage bucket with an optional path prefix.

        For example:

            $ gcloud firestore export gs://mybucket/my/path

        Will place the export in the mybucket bucket in objects prefixed with
        my/path.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --collection-ids=[COLLECTION_GROUP_IDS,...]
        List specifying which collection groups will be included in the
        operation. When omitted, all collection groups are included.

        For example, to operate on only the customers and orders collections
        groups:

            $ gcloud firestore export --collection-ids='customers','orders'

     --database=DATABASE; default="(default)"
        The database to operate on. The default value is (default).

        For example, to operate on database foo:

            $ gcloud firestore export --database='foo'

     --namespace-ids=[NAMESPACE_IDS,...]
        List specifying which namespaces will be included in the operation.
        When omitted, all namespaces are included.

        This is only supported for Datastore Mode databases.

        For example, to operate on only the customers and orders namespaces:

            $ gcloud firestore export --namespaces-ids='customers','orders'

     --snapshot-time=SNAPSHOT_TIME
        The version of the database to export.

        The timestamp must be in the past, rounded to the minute and not older
        than earliestVersionTime. If specified, then the exported documents
        will represent a consistent view of the database at the provided time.
        Otherwise, there are no guarantees about the consistency of the
        exported documents.

        For example, to operate on snapshot time 2023-05-26T10:20:00.00Z:

            $ gcloud firestore export --snapshot-time='2023-05-26T10:20:00.00Z'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore export

        $ gcloud beta firestore export
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud firestore export gs://mybucket/my/path \
    --collection-ids='specific collection group1','specific collection group2' \
    --async
```

### gcloud beta firestore export

```text
NAME
    gcloud beta firestore export - export Cloud Firestore documents to Google
        Cloud Storage

SYNOPSIS
    gcloud beta firestore export OUTPUT_URI_PREFIX [--async]
        [--collection-ids=[COLLECTION_GROUP_IDS,...]]
        [--database=DATABASE; default="(default)"]
        [--namespace-ids=[NAMESPACE_IDS,...]] [--snapshot-time=SNAPSHOT_TIME]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore export

```text
NAME
    gcloud alpha firestore export - export Cloud Firestore documents to Google
        Cloud Storage

SYNOPSIS
    gcloud alpha firestore export OUTPUT_URI_PREFIX [--async]
        [--collection-ids=[COLLECTION_GROUP_IDS,...]]
        [--database=DATABASE; default="(default)"]
        [--namespace-ids=[NAMESPACE_IDS,...]] [--snapshot-time=SNAPSHOT_TIME]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/firestore/export (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
