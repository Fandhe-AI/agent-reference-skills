---
source: https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/catalogs/shares/sync
---

# gcloud design-center spaces catalogs shares sync

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud design-center spaces catalogs shares sync

```text
NAME
    gcloud design-center spaces catalogs shares sync - sync a share

SYNOPSIS
    gcloud design-center spaces catalogs shares sync
        (SHARE : --catalog=CATALOG --location=LOCATION --space=SPACE) [--async]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Sync a share in a catalog.

EXAMPLES
    To sync the share my-share in catalog my-catalog, space my-space, project
    my-project and location us-central1, run:

        $ gcloud design-center spaces catalogs shares sync my-share \
            --catalog=my-catalog --space=my-space --location=us-central1

    Or run:

        $ gcloud design-center spaces catalogs shares sync \
            projects/my-project/locations/us-central1/spaces/my-space/\
        catalogs/my-catalog/shares/my-share

    To sync the share my-share in catalog my-catalog, space my-space, project
    my-project and location us-central1 asynchronously, run:

        $ gcloud design-center spaces catalogs shares sync \
            --catalog=my-catalog --space=my-space --location=us-central1 \
            --async

POSITIONAL ARGUMENTS
     Share resource - The share name in the following format:
     projects/$project/locations/$location/spaces/$space/catalogs/$catalog/shares/$share
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument share on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       SHARE
          ID of the share or fully qualified identifier for the share.

          To set the share attribute:
          + provide the argument share on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --catalog=CATALOG
          The catalog id of the share resource.

          To set the catalog attribute:
          + provide the argument share on the command line with a fully
            specified name;
          + provide the argument --catalog on the command line.

       --location=LOCATION
          The location id of the share resource.

          To set the location attribute:
          + provide the argument share on the command line with a fully
            specified name;
          + provide the argument --location on the command line.

       --space=SPACE
          The space id of the share resource.

          To set the space attribute:
          + provide the argument share on the command line with a fully
            specified name;
          + provide the argument --space on the command line.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the designcenter/v1 API. The full documentation for this
    API can be found at: http://cloud.google.com/application-design-center/docs

NOTES
    This variant is also available:

        $ gcloud alpha design-center spaces catalogs shares sync
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud design-center spaces catalogs shares sync projects/my-project/locations/us-central1/spaces/my-space/catalogs/my-catalog/shares/my-share

gcloud design-center spaces catalogs shares sync my-share \
    --catalog=my-catalog \
    --space=my-space \
    --location=us-central1 \
    --async
```

### gcloud alpha design-center spaces catalogs shares sync

```text
NAME
    gcloud alpha design-center spaces catalogs shares sync - sync a share

SYNOPSIS
    gcloud alpha design-center spaces catalogs shares sync
        (SHARE : --catalog=CATALOG --location=LOCATION --space=SPACE) [--async]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the asynchronous example omits the share, which the SYNOPSIS requires (gcloud 593.0.0: "argument --catalog --location --space: SHARE must be specified"); the runnable form adds `my-share`, the share named in the text of the example.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/catalogs/shares/sync (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
