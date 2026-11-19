---
source: https://docs.cloud.google.com/sdk/gcloud/reference/data-catalog/taxonomies/import
---

# gcloud data-catalog taxonomies import

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud data-catalog taxonomies import

```text
NAME
    gcloud data-catalog taxonomies import - export a file with serialized
        taxonomies to a certain project

SYNOPSIS
    gcloud data-catalog taxonomies import TAXONOMIES --location=LOCATION
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Export a file with serialized taxonomies to a certain project.

EXAMPLES
    To parse and import the taxonomies contained in '/tmp/taxonomies.json' to
    your project within location LOCATION:

        $ gcloud data-catalog taxonomies import "/tmp/taxonomies.json" \
            --location="LOCATION"

POSITIONAL ARGUMENTS
     TAXONOMIES
        File containing serialized taxonomy.

REQUIRED FLAGS
     Location resource - Location to import taxonomies to. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --location on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       --location=LOCATION
          ID of the location or fully qualified identifier for the location.

          To set the location attribute:
          + provide the argument --location on the command line.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha data-catalog taxonomies import

        $ gcloud beta data-catalog taxonomies import
```

### gcloud beta data-catalog taxonomies import

```text
NAME
    gcloud beta data-catalog taxonomies import - export a file with serialized
        taxonomies to a certain project

SYNOPSIS
    gcloud beta data-catalog taxonomies import TAXONOMIES --location=LOCATION
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha data-catalog taxonomies import

```text
NAME
    gcloud alpha data-catalog taxonomies import - export a file with serialized
        taxonomies to a certain project

SYNOPSIS
    gcloud alpha data-catalog taxonomies import TAXONOMIES --location=LOCATION
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Not deprecated: the commands on this page manage Policy Tag Manager taxonomies and policy tags; the Data Catalog deprecations page lists Data Catalog with deprecated date "February 3, 2025" and shutdown date "June 1, 2026", and says "This deprecation applies to Data Catalog metadata search and cataloging features (such as custom entries, entry groups, and tag templates). The Policy Tag Manager service (taxonomies and policy tags), which is used for column-level access control and dynamic data masking in BigQuery, isn't deprecated and continues to be served under the `datacatalog.googleapis.com` API endpoint. The `datacatalog.googleapis.com` API must remain enabled for projects that use BigQuery policy tags."; for metadata search and cataloging it points to Knowledge Catalog (https://docs.cloud.google.com/dataplex/docs/transition-to-dataplex-catalog) (https://docs.cloud.google.com/data-catalog/docs/deprecations, retrieved 2026-11-19).
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/data-catalog/taxonomies/import (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
