---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/glossaries/delete
---

# gcloud dataplex glossaries delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dataplex glossaries delete

```text
NAME
    gcloud dataplex glossaries delete - delete a Dataplex Glossary

SYNOPSIS
    gcloud dataplex glossaries delete (GLOSSARY : --location=LOCATION)
        [--async] [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Delete a Dataplex Glossary.

EXAMPLES
    To Delete Glossary test-glossary in project test-dataplex at location
    us-central1, run:        $ gcloud dataplex glossaries delete test-glossary \
          --location=us-central1 --project=test-dataplex

POSITIONAL ARGUMENTS
     Glossary resource - Arguments and flags that define the Dataplex Glossary
     you want to delete. The arguments in this group can be used to specify the
     attributes of this resource. (NOTE) Some attributes are not given
     arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument glossary on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       GLOSSARY
          ID of the glossary or fully qualified identifier for the glossary.

          To set the glossary attribute:
          + provide the argument glossary on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument glossary on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

FLAGS
     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --etag=ETAG
        etag value for particular Glossary.

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

        $ gcloud alpha dataplex glossaries delete
```

### gcloud alpha dataplex glossaries delete

```text
NAME
    gcloud alpha dataplex glossaries delete - delete a Dataplex Glossary

SYNOPSIS
    gcloud alpha dataplex glossaries delete (GLOSSARY : --location=LOCATION)
        [--async] [--etag=ETAG] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/glossaries/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
