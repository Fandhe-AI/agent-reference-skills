---
source: https://docs.cloud.google.com/sdk/gcloud/reference/firestore/bulk-delete
---

# gcloud firestore bulk-delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud firestore bulk-delete

```text
NAME
    gcloud firestore bulk-delete - bulk delete Cloud Firestore documents

SYNOPSIS
    gcloud firestore bulk-delete [--async]
        [--collection-ids=[COLLECTION_GROUP_IDS,...]]
        [--database=DATABASE; default="(default)"]
        [--namespace-ids=[NAMESPACE_IDS,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    bulk delete Cloud Firestore documents.

EXAMPLES
    To bulk delete a specific set of collections groups asynchronously, run:

        $ gcloud firestore bulk-delete \
            --collection-ids='specific collection group1','specific
         collection group2' --async

    To bulk delete all collection groups from certain namespace, run:

        $ gcloud firestore bulk-delete \
            --namespace-ids='specific namespace id'

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --collection-ids=[COLLECTION_GROUP_IDS,...]
        List specifying which collection groups will be included in the
        operation. When omitted, all collection groups are included.

        For example, to operate on only the customers and orders collections
        groups:

            $ gcloud firestore bulk-delete --collection-ids='customers','orders'

     --database=DATABASE; default="(default)"
        The database to operate on. The default value is (default).

        For example, to operate on database foo:

            $ gcloud firestore bulk-delete --database='foo'

     --namespace-ids=[NAMESPACE_IDS,...]
        List specifying which namespaces will be included in the operation.
        When omitted, all namespaces are included.

        This is only supported for Datastore Mode databases.

        For example, to operate on only the customers and orders namespaces:

            $ gcloud firestore bulk-delete --namespaces-ids='customers','orders'

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha firestore bulk-delete

        $ gcloud beta firestore bulk-delete
```

Adapted (not in the official docs): runnable form of the example(s) above: the commands are rewritten so that they run as described (see Notes).

```bash
gcloud firestore bulk-delete --namespace-ids='customers','orders'
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud firestore bulk-delete \
    --collection-ids='specific collection group1','specific collection group2' \
    --async
```

### gcloud beta firestore bulk-delete

```text
NAME
    gcloud beta firestore bulk-delete - bulk delete Cloud Firestore documents

SYNOPSIS
    gcloud beta firestore bulk-delete [--async]
        [--collection-ids=[COLLECTION_GROUP_IDS,...]]
        [--database=DATABASE; default="(default)"]
        [--namespace-ids=[NAMESPACE_IDS,...]] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha firestore bulk-delete

```text
NAME
    gcloud alpha firestore bulk-delete - bulk delete Cloud Firestore documents

SYNOPSIS
    gcloud alpha firestore bulk-delete [--async]
        [--collection-ids=[COLLECTION_GROUP_IDS,...]]
        [--database=DATABASE; default="(default)"]
        [--namespace-ids=[NAMESPACE_IDS,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `--namespace-ids` flag description gives the example `gcloud firestore bulk-delete --namespaces-ids='customers','orders'`, but the flag is `--namespace-ids` (as in the SYNOPSIS and FLAGS); gcloud 593.0.0 rejects `--namespaces-ids` as an unrecognized argument. The runnable form uses `--namespace-ids`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/firestore/bulk-delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
