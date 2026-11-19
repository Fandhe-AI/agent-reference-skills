---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/metadata-jobs
---

# gcloud dataplex metadata-jobs

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dataplex metadata-jobs cancel

```text
NAME
    gcloud dataplex metadata-jobs cancel - cancel a Metadata Job run

SYNOPSIS
    gcloud dataplex metadata-jobs cancel (METADATA_JOB : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Cancels an existing Metadata Job run.

EXAMPLES
    To cancel a Dataplex Metadata Job run test-metadata-job within location
    us-central1 and in project test-project

        $ gcloud dataplex metadata-jobs cancel test-metadata-job \
           --location=us-central1 --project=test-project

POSITIONAL ARGUMENTS
     Metadata job resource - Arguments and flags that define the Dataplex
     metadata job you want to cancel. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument metadata_job on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       METADATA_JOB
          ID of the metadata job or fully qualified identifier for the metadata
          job.

          To set the metadata_job attribute:
          + provide the argument metadata_job on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument metadata_job on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex metadata-jobs cancel
```

### gcloud dataplex metadata-jobs create

```text
NAME
    gcloud dataplex metadata-jobs create - create a Dataplex Metadata Job

SYNOPSIS
    gcloud dataplex metadata-jobs create [[METADATA_JOB] --location=LOCATION]
        --type=TYPE
        (--export-output-path=EXPORT_OUTPUT_PATH
          ((--export-entry-groups=[EXPORT_ENTRY_GROUPS,...]
          | --export-organization-level=EXPORT_ORGANIZATION_LEVEL
          | --export-projects=[EXPORT_PROJECTS,...])
          : --export-aspect-types=[EXPORT_ASPECT_TYPES,...]
          --export-entry-types=[EXPORT_ENTRY_TYPES,...])
          | [--import-aspect-sync-mode=IMPORT_ASPECT_SYNC_MODE
          --import-entry-sync-mode=IMPORT_ENTRY_SYNC_MODE
          --import-source-storage-uri=IMPORT_SOURCE_STORAGE_URI
          (--import-aspect-types=[IMPORT_ASPECT_TYPES,...]
          --import-entry-groups=[IMPORT_ENTRY_GROUPS,...]
          --import-entry-link-types=[IMPORT_ENTRY_LINK_TYPES,...]
          --import-entry-types=[IMPORT_ENTRY_TYPES,...]
          --import-glossaries=[IMPORT_GLOSSARIES,...]
          --import-referenced-entry-scopes=[IMPORT_REFERENCED_ENTRY_SCOPES,
          ...]) : --import-log-level=IMPORT_LOG_LEVEL
          --import-source-create-time=IMPORT_SOURCE_CREATE_TIME]) [--async]
        [--labels=[KEY=VALUE,...]] [--validate-only] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    A metadata job represents a long running job on Dataplex Catalog metadata
    entries. Some operations include importing and exporting metadata into
    entry groups through the usage of entry types and aspect types.

    The Metadata Job ID will be used to identify each configuration run. The
    Metadata Job id must follow these rules:
      o Must contain only lowercase letters, numbers, and hyphens.
      o Must start with a letter.
      o Must end with a number or a letter.
      o Must be between 1-63 characters.
      o Must be unique within the customer project / location.

EXAMPLES
    To create a Dataplex Metadata Job with type IMPORT and name my-metadata-job
    in location us-central1 with additional parameters, run:

        $ gcloud dataplex metadata-jobs create my-metadata-job \
            --location=us-central --project=test-project --type=import \
            --import-source-storage-uri=gs://test-storage/ \
            --import-source-create-time="2019-01-23T12:34:56.123456789Z" \
            --import-entry-sync-mode=FULL \
            --import-aspect-sync-mode=INCREMENTAL \
            --import-log-level="debug" \
            --import-entry-groups=projects/test-project/locations/\
        us-central1/entryGroups/eg1 \
            --import-entry-types="projects/test-project/locations/us-central\
        1/entryTypes/et1", \
            "projects/test-project/locations/us-central1/entryTypes/et2" \
            --import-aspect-types="projects/test-project/locations/us-centra\
        l1/aspectTypes/at1", \
            "projects/test-project/locations/us-central1/aspectTypes/at2"

    To create a Dataplex Metadata Job with type EXPORT and name my-metadata-job
    in location us-central1 with additional parameters, run:

        $ gcloud dataplex metadata-jobs create my-metadata-job \
            --location=us-central --project=test-project --type=export \
            --export-output-path=gs://test-storage/ \
            --export-entry-groups=projects/test-project/locations/\
        us-central1/entryGroups/eg1 \
            --export-entry-types="projects/test-project/locations/us-central\
        1/entryTypes/et1", \
            "projects/test-project/locations/us-central1/entryTypes/et2" \
            --export-aspect-types="projects/test-project/locations/us-centra\
        l1/aspectTypes/at1", \
            "projects/test-project/locations/us-central1/aspectTypes/at2"

POSITIONAL ARGUMENTS
     Metadata job resource - Arguments and flags that define the Dataplex
     metdata job you want to create. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument metadata_job on the command line with a fully
        specified name;
      * job ID is optional and will be generated if not specified with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     [METADATA_JOB]
        ID of the metadata job or fully qualified identifier for the metadata
        job.

        To set the metadata_job attribute:
        * provide the argument metadata_job on the command line;
        * job ID is optional and will be generated if not specified.

     --location=LOCATION
        The location of the Dataplex resource.

        To set the location attribute:
        * provide the argument metadata_job on the command line with a fully
          specified name;
        * job ID is optional and will be generated if not specified with a
          fully specified name;
        * provide the argument --location on the command line;
        * set the property dataplex/location.

REQUIRED FLAGS
     --type=TYPE
        Type. TYPE must be one of:

         EXPORT
            A Metadata Export Job will export entries and aspects from the
            declared Dataplex scope to the specified Cloud Storage location.
         IMPORT
            A Metadata Import Job will ingest, update, or delete entries and
            aspects into the declared Dataplex entry group.

     Settings for metadata job operation.

     Exactly one of these must be specified:

       Settings for metadata export job operation.

       --export-output-path=EXPORT_OUTPUT_PATH
          The Cloud Storage location to export metadata to.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       A boundary on the scope of impact that the metadata export job can have.

       At least one of these must be specified:

         --export-aspect-types=[EXPORT_ASPECT_TYPES,...]
            The list of aspect types to export metadata from.

         --export-entry-types=[EXPORT_ENTRY_TYPES,...]
            The list of entry types to export metadata from.

         The scope of resources to export metadata from.

         Exactly one of these must be specified:

           --export-entry-groups=[EXPORT_ENTRY_GROUPS,...]
              The list of entry groups to export metadata from.

           --export-organization-level=EXPORT_ORGANIZATION_LEVEL
              Whether to export metadata at the organization level.

           --export-projects=[EXPORT_PROJECTS,...]
              The list of projects to export metadata from.

       Settings for metadata import job operation.

       --import-aspect-sync-mode=IMPORT_ASPECT_SYNC_MODE
          Type. IMPORT_ASPECT_SYNC_MODE must be one of:

           FULL
              All resources in the job's scope are modified. If a resource
              exists in Dataplex but isn't included in the metadata import
              file, the resource is deleted when you run the metadata job. Use
              this mode to perform a full sync of the set of entries in the job
              scope.
           INCREMENTAL
              Only the entries and aspects that are explicitly included in the
              metadata import file are modified. Use this mode to modify a
              subset of resources while leaving unreferenced resources
              unchanged.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --import-entry-sync-mode=IMPORT_ENTRY_SYNC_MODE
          Type. IMPORT_ENTRY_SYNC_MODE must be one of:

           FULL
              All resources in the job's scope are modified. If a resource
              exists in Dataplex but isn't included in the metadata import
              file, the resource is deleted when you run the metadata job. Use
              this mode to perform a full sync of the set of entries in the job
              scope.
           INCREMENTAL
              Only the entries and aspects that are explicitly included in the
              metadata import file are modified. Use this mode to modify a
              subset of resources while leaving unreferenced resources
              unchanged.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --import-source-storage-uri=IMPORT_SOURCE_STORAGE_URI
          The Dataplex source storage URI to import metadata from.

          This flag argument must be specified if any of the other arguments in
          this group are specified.

       --import-log-level=IMPORT_LOG_LEVEL
          Type. IMPORT_LOG_LEVEL must be one of:

           DEBUG
              Debug-level logging. Captures detailed logs for each import item.
              Use debug-level logging to troubleshoot issues with specific
              import items. For example, use debug-level logging to identify
              resources that are missing from the job scope, entries or aspects
              that don't conform to the associated entry type or aspect type,
              or other misconfigurations with the metadata import file..
           INFO
              Info-level logging. Captures logs at the overall job level.
              Includes aggregate logs about import items, but doesn't specify
              which import item has an error..

       --import-source-create-time=IMPORT_SOURCE_CREATE_TIME
          Time at which the event took place. See $ gcloud topic datetimes for
          information on supported time formats.

       A boundary on the scope of impact that the metadata import job can have.

       At least one of these must be specified:

         --import-aspect-types=[IMPORT_ASPECT_TYPES,...]
            The list of aspect types to import metadata jobs into.

         --import-entry-groups=[IMPORT_ENTRY_GROUPS,...]
            The list of entry groups to import metadata jobs into.

         --import-entry-link-types=[IMPORT_ENTRY_LINK_TYPES,...]
            The list of entry link types to import metadata jobs into.

         --import-entry-types=[IMPORT_ENTRY_TYPES,...]
            The list of entry types to import metadata jobs into.

         --import-glossaries=[IMPORT_GLOSSARIES,...]
            The list of glossaries to import metadata jobs into.

         --import-referenced-entry-scopes=[IMPORT_REFERENCED_ENTRY_SCOPES,...]
            The list of referenced entry scopes to import metadata jobs into.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     --validate-only
        Validate the create action, but don't actually perform it.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex metadata-jobs create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud dataplex metadata-jobs create my-metadata-job \
    --location=us-central1 \
    --project=test-project \
    --type=import \
    --import-source-storage-uri=gs://test-storage/ \
    --import-source-create-time="2019-01-23T12:34:56.123456789Z" \
    --import-entry-sync-mode=FULL \
    --import-aspect-sync-mode=INCREMENTAL \
    --import-log-level="debug" \
    --import-entry-groups=projects/test-project/locations/us-central1/entryGroups/eg1 \
    --import-entry-types="projects/test-project/locations/us-central1/entryTypes/et1","projects/test-project/locations/us-central1/entryTypes/et2" \
    --import-aspect-types="projects/test-project/locations/us-central1/aspectTypes/at1","projects/test-project/locations/us-central1/aspectTypes/at2"

gcloud dataplex metadata-jobs create my-metadata-job \
    --location=us-central1 \
    --project=test-project \
    --type=export \
    --export-output-path=gs://test-storage/ \
    --export-entry-groups=projects/test-project/locations/us-central1/entryGroups/eg1 \
    --export-entry-types="projects/test-project/locations/us-central1/entryTypes/et1","projects/test-project/locations/us-central1/entryTypes/et2" \
    --export-aspect-types="projects/test-project/locations/us-central1/aspectTypes/at1","projects/test-project/locations/us-central1/aspectTypes/at2"
```

### gcloud dataplex metadata-jobs describe

```text
NAME
    gcloud dataplex metadata-jobs describe - describe a Metadata Job

SYNOPSIS
    gcloud dataplex metadata-jobs describe (METADATA_JOB : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Displays all details of a Dataplex Metadata Job given a valid Metadata Job
    ID.

EXAMPLES
    To describe a Dataplex Metadata Job test-metadata-job within location
    us-central1 and in project test-project

        $ gcloud dataplex metadata-jobs describe test-metadata-job \
           --location=us-central1 --project=test-project

POSITIONAL ARGUMENTS
     Metadata job resource - Arguments and flags that define the Dataplex
     metadata job you want to retrieve. The arguments in this group can be used
     to specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument metadata_job on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       METADATA_JOB
          ID of the metadata job or fully qualified identifier for the metadata
          job.

          To set the metadata_job attribute:
          + provide the argument metadata_job on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument metadata_job on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex metadata-jobs describe
```

### gcloud dataplex metadata-jobs list

```text
NAME
    gcloud dataplex metadata-jobs list - list Metadata Job resources under a
        project

SYNOPSIS
    gcloud dataplex metadata-jobs list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    List all Metadata Job resource under a specific project and location.

EXAMPLES
    To List Metadata Jobs in project test-dataplex at location us-central1

        $ gcloud dataplex metadata-jobs list --location=us-central1 \
          --project=test-dataplex

FLAGS
     Location resource - Location in which to list Metadata Jobs. This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * set the property dataplex/location with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --location=LOCATION
        ID of the location or fully qualified identifier for the location.

        To set the location attribute:
        * provide the argument --location on the command line;
        * set the property dataplex/location.

LIST COMMAND FLAGS
     --filter=EXPRESSION
        Apply a Boolean filter EXPRESSION to each resource item to be listed.
        If the expression evaluates True, then that item is listed. For more
        details and examples of filter expressions, run $ gcloud topic filters.
        This flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --limit=LIMIT
        Maximum number of resources to list. The default is unlimited. This
        flag interacts with other flags that are applied in this order:
        --flatten, --sort-by, --filter, --limit.

     --page-size=PAGE_SIZE
        Some services group resource list output into pages. This flag
        specifies the maximum number of resources per page. The default is
        determined by the service if it supports paging, otherwise it is
        unlimited (no paging). Paging may be applied before or after --filter
        and --limit depending on the service.

     --sort-by=[FIELD,...]
        Comma-separated list of resource field key names to sort by. The
        default order is ascending. Prefix a field with ``~'' for descending
        order on that field. This flag interacts with other flags that are
        applied in this order: --flatten, --sort-by, --filter, --limit.

     --uri
        Print a list of resource URIs instead of the default output, and change
        the command output to a list of URIs. If this flag is used with
        --format, the formatting is applied on this URI list. To display URIs
        alongside other keys instead, use the uri() transform.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the dataplex/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/dataplex/docs

NOTES
    This variant is also available:

        $ gcloud alpha dataplex metadata-jobs list
```

### gcloud alpha dataplex metadata-jobs cancel

```text
NAME
    gcloud alpha dataplex metadata-jobs cancel - cancel a Metadata Job run

SYNOPSIS
    gcloud alpha dataplex metadata-jobs cancel
        (METADATA_JOB : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex metadata-jobs create

```text
NAME
    gcloud alpha dataplex metadata-jobs create - create a Dataplex Metadata Job

SYNOPSIS
    gcloud alpha dataplex metadata-jobs create
        [[METADATA_JOB] --location=LOCATION] --type=TYPE
        (--export-output-path=EXPORT_OUTPUT_PATH
          ((--export-entry-groups=[EXPORT_ENTRY_GROUPS,...]
          | --export-organization-level=EXPORT_ORGANIZATION_LEVEL
          | --export-projects=[EXPORT_PROJECTS,...])
          : --export-aspect-types=[EXPORT_ASPECT_TYPES,...]
          --export-entry-types=[EXPORT_ENTRY_TYPES,...])
          | [--import-aspect-sync-mode=IMPORT_ASPECT_SYNC_MODE
          --import-entry-sync-mode=IMPORT_ENTRY_SYNC_MODE
          --import-source-storage-uri=IMPORT_SOURCE_STORAGE_URI
          (--import-aspect-types=[IMPORT_ASPECT_TYPES,...]
          --import-entry-groups=[IMPORT_ENTRY_GROUPS,...]
          --import-entry-link-types=[IMPORT_ENTRY_LINK_TYPES,...]
          --import-entry-types=[IMPORT_ENTRY_TYPES,...]
          --import-glossaries=[IMPORT_GLOSSARIES,...]
          --import-referenced-entry-scopes=[IMPORT_REFERENCED_ENTRY_SCOPES,
          ...]) : --import-log-level=IMPORT_LOG_LEVEL
          --import-source-create-time=IMPORT_SOURCE_CREATE_TIME]) [--async]
        [--labels=[KEY=VALUE,...]] [--validate-only] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex metadata-jobs describe

```text
NAME
    gcloud alpha dataplex metadata-jobs describe - describe a Metadata Job

SYNOPSIS
    gcloud alpha dataplex metadata-jobs describe
        (METADATA_JOB : --location=LOCATION) [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha dataplex metadata-jobs list

```text
NAME
    gcloud alpha dataplex metadata-jobs list - list Metadata Job resources
        under a project

SYNOPSIS
    gcloud alpha dataplex metadata-jobs list [--location=LOCATION]
        [--filter=EXPRESSION] [--limit=LIMIT] [--page-size=PAGE_SIZE]
        [--sort-by=[FIELD,...]] [--uri] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `create` examples say "in location us-central1" and use entry groups in `locations/us-central1`, but pass `--location=us-central`; the runnable form uses `--location=us-central1`.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the `create` examples separate the values of `--import-entry-types`, `--import-aspect-types`, `--export-entry-types` and `--export-aspect-types` with `", "` (comma and space); the flags take a comma-separated list (`--import-entry-types=[IMPORT_ENTRY_TYPES,...]`) and gcloud 593.0.0 rejects the second value as an unrecognized argument, so the runnable form removes the space.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/metadata-jobs (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
