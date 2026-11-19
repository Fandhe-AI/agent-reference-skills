---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/glossaries/update
---

# gcloud dataplex glossaries update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dataplex glossaries update

```text
NAME
    gcloud dataplex glossaries update - updates a Dataplex Glossary

SYNOPSIS
    gcloud dataplex glossaries update (GLOSSARY : --location=LOCATION)
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME] [--etag=ETAG]
        [--labels=[KEY=VALUE,...]] [--async | --validate-only]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Updates a Dataplex Glossary.

EXAMPLES
    To update Glossary test-glossary in project test-dataplex at location
    us-central1, with description updated description and displayName
    displayName        $ gcloud dataplex glossaries update test-glossary \
            --location=us-central1 --project test-dataplex \
            --description='updated description'

POSITIONAL ARGUMENTS
     Glossary resource - Arguments and flags that define the Dataplex Glossary
     you want to update. The arguments in this group can be used to specify the
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
          The location of the Dataplex resource.

          To set the location attribute:
          + provide the argument glossary on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

FLAGS
     --description=DESCRIPTION
        Description of the Glossary.

     --display-name=DISPLAY_NAME
        Display Name of the Glossary.

     --etag=ETAG
        etag value for particular Glossary.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     At most one of these can be specified:

       --async
          Return immediately, without waiting for the operation in progress to
          complete.

       --validate-only
          Validate the update action, but don't actually perform it.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    This variant is also available:

        $ gcloud alpha dataplex glossaries update
```

### gcloud alpha dataplex glossaries update

```text
NAME
    gcloud alpha dataplex glossaries update - updates a Dataplex Glossary

SYNOPSIS
    gcloud alpha dataplex glossaries update (GLOSSARY : --location=LOCATION)
        [--description=DESCRIPTION] [--display-name=DISPLAY_NAME] [--etag=ETAG]
        [--labels=[KEY=VALUE,...]] [--async | --validate-only]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/glossaries/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
