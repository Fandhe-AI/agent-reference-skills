---
source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/restore
---

# gcloud storage restore

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud storage restore

```text
NAME
    gcloud storage restore - restore one or more soft-deleted objects

SYNOPSIS
    gcloud storage restore [URLS ...] [--all-versions, -a] [--async]
        [--[no-]preserve-acl, -p] [--read-paths-from-stdin, -I]
        [--allow-overwrite --created-after-time=CREATED_AFTER_TIME
          --created-before-time=CREATED_BEFORE_TIME
          --deleted-after-time=DELETED_AFTER_TIME
          --deleted-before-time=DELETED_BEFORE_TIME]
        [--if-generation-match=GENERATION
          --if-metageneration-match=METAGENERATION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    The restore command restores soft-deleted resources:

        $ gcloud storage restore url...

EXAMPLES
    Restore soft-deleted version of bucket with generations:

        $ gcloud storage restore gs://bucket#123

    Restore several soft-deleted buckets with generations:

        $ gcloud storage restore gs://bucket1#123 gs://bucket2#456

    Restore latest soft-deleted version of object in a bucket.

        $ gcloud storage restore gs://bucket/file1.txt

    Restore a specific soft-deleted version of object in a bucket by specifying
    the generation.

        $ gcloud storage restore gs://bucket/file1.txt#123

    Restore all soft-deleted versions of object in a bucket.

        $ gcloud storage restore gs://bucket/file1.txt --all-versions

    Restore several objects in a bucket (with or without generation):

        $ gcloud storage restore gs://bucket/file1.txt \
            gs://bucket/file2.txt#456

    Restore the latest soft-deleted version of all text objects in a bucket:

        $ gcloud storage restore gs://bucket/**.txt

    Restore a list of objects read from stdin (with or without generation):

        $ cat list-of-files.txt | gcloud storage restore \
            --read-paths-from-stdin

    Restore object with its original ACL policy:

        $ gcloud storage restore gs://bucket/file1.txt --preserve-acl

    Restore all objects in a bucket asynchronously:

        $ gcloud storage restore gs://bucket/** --async

    Restore all text files in a bucket asynchronously:

        $ gcloud storage restore gs://bucket/**.txt --async

    Restore objects created within a specific time range:

        $ gcloud storage restore gs://bucket/** --async \
            --created-after-time="2023-01-01T00:00:00Z" \
            --created-before-time="2023-01-31T23:59:59Z"

    Restore objects soft-deleted within a specific time range:

        $ gcloud storage restore gs://bucket/** --async \
            --deleted-after-time="2023-01-01T00:00:00Z" \
            --deleted-before-time="2023-01-31T23:59:59Z"

    Restore objects using a combination of creation and deletion time filters:

        $ gcloud storage restore gs://bucket/** --async --allow-overwrite \
          --created-after-time="2023-01-01T00:00:00Z" \
          --deleted-after-time="2023-01-01T00:00:00Z"

    This command filters the objects that were live at 2023-01-01T00:00:00Z and
    then soft-deleted afterwards. This combination of filters is especially
    helpful if there is a period of erroneous overwrites. They allow you to go
    back to the point just before the overwrites began. You will also need to
    set the --allow-overwrite option to true.

POSITIONAL ARGUMENTS
     [URLS ...]
        The url of objects to list.

FLAGS
     SYNCHRONOUS RESTORE OPTIONS

     --all-versions, -a
        Restores all versions of soft-deleted objects.

        This flag is only useful for buckets with [object versioning]
        (https://cloud.google.com/storage/docs/object-versioning) enabled. In
        this case, the latest soft-deleted version will become live and the
        previous generations will become noncurrent.

        If versioning is disabled, the latest soft-deleted version will become
        live and previous generations will be soft-deleted again.

        This flag disables parallelism to preserve version order.

     --async
        Initiates an asynchronous bulk restore operation on the specified
        bucket.

     --[no-]preserve-acl, -p
        Preserves ACLs when copying in the cloud. This option is Cloud
        Storage-only, and you need OWNER access to all copied objects. If all
        objects in the destination bucket should have the same ACL, you can
        also set a default object ACL on that bucket instead of using this
        flag. Preserving ACLs is the default behavior for updating existing
        objects. Use --preserve-acl to enable and --no-preserve-acl to disable.

     --read-paths-from-stdin, -I
        Read the list of URLs from stdin.

     BULK RESTORE OPTIONS

     --allow-overwrite
        If included, live objects will be overwritten. If versioning is
        enabled, this will result in a noncurrent object. If versioning is not
        enabled, this will result in a soft-deleted object.

     --created-after-time=CREATED_AFTER_TIME
        Restores only the objects that were created after this time.

     --created-before-time=CREATED_BEFORE_TIME
        Restores only the objects that were created before this time.

     --deleted-after-time=DELETED_AFTER_TIME
        Restores only the objects that were soft-deleted after this time.

     --deleted-before-time=DELETED_BEFORE_TIME
        Restores only the objects that were soft-deleted before this time.

PRECONDITION FLAGS
     --if-generation-match=GENERATION
        Execute only if the generation matches the generation of the requested
        object.

     --if-metageneration-match=METAGENERATION
        Execute only if the metageneration matches the metageneration of the
        requested object.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha storage restore
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud storage restore gs://bucket/** \
    --async \
    --allow-overwrite \
    --created-before-time="2023-01-01T00:00:00Z" \
    --deleted-after-time="2023-01-01T00:00:00Z"
```

### gcloud alpha storage restore

```text
NAME
    gcloud alpha storage restore - restore one or more soft-deleted objects

SYNOPSIS
    gcloud alpha storage restore [URLS ...] [--all-versions, -a] [--async]
        [--[no-]preserve-acl, -p] [--read-paths-from-stdin, -I]
        [--allow-overwrite --created-after-time=CREATED_AFTER_TIME
          --created-before-time=CREATED_BEFORE_TIME
          --deleted-after-time=DELETED_AFTER_TIME
          --deleted-before-time=DELETED_BEFORE_TIME]
        [--if-generation-match=GENERATION
          --if-metageneration-match=METAGENERATION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the point-in-time example says it selects the objects that were live at 2023-01-01T00:00:00Z and then soft-deleted, but passes `--created-after-time`, which selects generations created after that time and excludes the ones that were live then (with `--allow-overwrite` it can make a wrong generation live); an object live at that time was created before it and deleted after it, so the runnable form uses `--created-before-time` with `--deleted-after-time`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/restore (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
