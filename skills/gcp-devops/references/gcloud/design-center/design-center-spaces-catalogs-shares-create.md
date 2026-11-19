---
source: https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/catalogs/shares/create
---

# gcloud design-center spaces catalogs shares create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud design-center spaces catalogs shares create

```text
NAME
    gcloud design-center spaces catalogs shares create - create a share

SYNOPSIS
    gcloud design-center spaces catalogs shares create
        (SHARE : --catalog=CATALOG --space=SPACE)
        --destination-space=DESTINATION_SPACE [--async] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a share in a catalog.

EXAMPLES
    To create a share my-share in catalog my-catalog to destination space
    my-destination-space, in space my-space, project my-project and location
    us-central1, run:

        $ gcloud design-center spaces catalogs shares create my-share \
            --catalog=my-catalog --space=my-space --project=my-project \
            --location=us-central1 --destination-space=my-destination-space

    Or run:

        $ gcloud design-center spaces catalogs shares create \
            projects/my-project/locations/us-central1/spaces/my-space/\
        catalogs/my-catalog/shares/my-share \
            --destination-space=my-destination-space

    To create the share my-share in catalog my-catalog to destination space
    projects/my-descendant-project/locations/us-central1/spaces/my-destination-space
    present in a descendant management project my-descendant-project, in the
    space my-space, project my-project and location us-central1, run:

        $ gcloud design-center spaces catalogs shares create my-share \
            --catalog=my-catalog --space=my-space --project=my-project \
            --location=us-central1 \
            --destination-space=projects/my-descendant-project/locations/\
        us-central1/spaces/my-destination-space

POSITIONAL ARGUMENTS
     Share resource - Identifier. The share name in the following format:
     projects/$project/locations/$location/spaces/$space/catalogs/$catalog/shares/$share
     The arguments in this group can be used to specify the attributes of this
     resource. (NOTE) Some attributes are not given arguments in this group but
     can be set in other ways.

     To set the project attribute:
      * provide the argument share on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument share on the command line with a fully specified
        name;
      * provide the argument --location on the command line.

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

       --space=SPACE
          The space id of the share resource.

          To set the space attribute:
          + provide the argument share on the command line with a fully
            specified name;
          + provide the argument --space on the command line.

REQUIRED FLAGS
     Space resource - The space resource path to which the catalog is shared.
     Format is projects/$project/locations/$location/spaces/$space This
     represents a Cloud resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument --destination-space on the command line with a
        fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     To set the location attribute:
      * provide the argument --destination-space on the command line with a
        fully specified name;
      * provide the argument --location on the command line.

     This must be specified.

       --destination-space=DESTINATION_SPACE
          ID of the space or fully qualified identifier for the space.

          To set the space attribute:
          + provide the argument --destination-space on the command line.

OPTIONAL FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --location=LOCATION
        For resources [share, destination-space], provides fallback value for
        resource location attribute. When the resource's full URI path is not
        provided, location will fallback to this flag value.

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

        $ gcloud alpha design-center spaces catalogs shares create
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined and the corrections listed in Notes are applied.

```bash
gcloud design-center spaces catalogs shares create projects/my-project/locations/us-central1/spaces/my-space/catalogs/my-catalog/shares/my-share \
    --destination-space=my-destination-space \
    --location=us-central1

gcloud design-center spaces catalogs shares create my-share \
    --catalog=my-catalog \
    --space=my-space \
    --project=my-project \
    --location=us-central1 \
    --destination-space=projects/my-descendant-project/locations/us-central1/spaces/my-destination-space
```

### gcloud alpha design-center spaces catalogs shares create

```text
NAME
    gcloud alpha design-center spaces catalogs shares create - create a share

SYNOPSIS
    gcloud alpha design-center spaces catalogs shares create
        (SHARE : --catalog=CATALOG --space=SPACE)
        --destination-space=DESTINATION_SPACE [--async] [--location=LOCATION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the second example passes the share as a full resource name and the destination space as the bare ID `my-destination-space`; the location of the destination space then has nothing to fall back on (gcloud 593.0.0: "Error parsing [destination_space] ... Failed to find attribute [location]"); the help says the destination space location falls back to `--location`, so the runnable form adds `--location=us-central1`.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/design-center/spaces/catalogs/shares/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
