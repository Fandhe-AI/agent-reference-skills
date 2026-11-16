---
source: https://docs.cloud.google.com/sdk/gcloud/reference/firestore/import
---

# gcloud firestore import

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud firestore import

```text
NAME
    gcloud firestore import - import Cloud Firestore documents from Google
        Cloud Storage

SYNOPSIS
    gcloud firestore import INPUT_URI_PREFIX [--async]
        [--collection-ids=[COLLECTION_GROUP_IDS,...]]
        [--database=DATABASE; default="(default)"]
        [--namespace-ids=[NAMESPACE_IDS,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    import Cloud Firestore documents from Google Cloud Storage.

EXAMPLES
    To import all collection groups from mybucket/my/path, run:

        $ gcloud firestore import gs://mybucket/my/path

    To import a specific set of collections groups asynchronously, run:

        $ gcloud firestore import gs://mybucket/my/path \
            --collection-ids='specific collection group1','specific
         collection group2' --async

    To import all collection groups from certain namespace, run:

        $ gcloud firestore import gs://mybucket/my/path \
            --namespace-ids='specific namespace id'

POSITIONAL ARGUMENTS
     INPUT_URI_PREFIX
        Location of the import files.

        This location is the 'output_uri_prefix' field of a previous export,
        and can be found via the 'gcloud firestore operations describe'
        command.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --collection-ids=[COLLECTION_GROUP_IDS,...]
        List specifying which collection groups will be included in the
        operation. When omitted, all collection groups are included.

        For example, to operate on only the customers and orders collections
        groups:

            $ gcloud firestore import --collection-ids='customers','orders'

     --database=DATABASE; default="(default)"
        The database to operate on. The default value is (default).

        For example, to operate on database foo:

            $ gcloud firestore import --database='foo'

     --namespace-ids=[NAMESPACE_IDS,...]
        List specifying which namespaces will be included in the operation.
        When omitted, all namespaces are included.

        This is only supported for Datastore Mode databases.

        For example, to operate on only the customers and orders namespaces:

            $ gcloud firestore import --namespaces-ids='customers','orders'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore import

        $ gcloud beta firestore import
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud firestore import gs://mybucket/my/path \
    --collection-ids='specific collection group1','specific collection group2' \
    --async
```

### gcloud beta firestore import

```text
NAME
    gcloud beta firestore import - import Cloud Firestore documents from Google
        Cloud Storage

SYNOPSIS
    gcloud beta firestore import INPUT_URI_PREFIX [--async]
        [--collection-ids=[COLLECTION_GROUP_IDS,...]]
        [--database=DATABASE; default="(default)"]
        [--namespace-ids=[NAMESPACE_IDS,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore import

```text
NAME
    gcloud alpha firestore import - import Cloud Firestore documents from
        Google Cloud Storage

SYNOPSIS
    gcloud alpha firestore import INPUT_URI_PREFIX [--async]
        [--collection-ids=[COLLECTION_GROUP_IDS,...]]
        [--database=DATABASE; default="(default)"]
        [--namespace-ids=[NAMESPACE_IDS,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/firestore/import (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
