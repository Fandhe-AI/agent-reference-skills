---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/data-products/create
---

# gcloud dataplex data-products create

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dataplex data-products create

```text
NAME
    gcloud dataplex data-products create - create a Dataplex data product
        resource

SYNOPSIS
    gcloud dataplex data-products create (DATA_PRODUCT : --location=LOCATION)
        --display-name=DISPLAY_NAME --owner-emails=[OWNER_EMAILS,...]
        [--access-groups=ACCESS_GROUPS] [--async] [--description=DESCRIPTION]
        [--labels=[KEY=VALUE,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Create a Dataplex data product resource.

    The data product ID must conform to RFC-1034 and contain only lower-case
    letters (a-z), numbers (0-9), or hyphens, with the first character a
    letter, the last a letter or a number, and a 63 character maximum. If not
    provided, a system generated ID will be used.

EXAMPLES
    To create a Dataplex data product test-dp in location us-central1 with
    display name "test dp" and owner "test@google.com", run:

        $ gcloud dataplex data-products create test-dp \
          --location=us-central1 --display-name="test dp" \
          --owner-emails="test@google.com"

POSITIONAL ARGUMENTS
     Data product resource - Arguments and flags that specify the Dataplex Data
     Product you want to create. The arguments in this group can be used to
     specify the attributes of this resource. (NOTE) Some attributes are not
     given arguments in this group but can be set in other ways.

     To set the project attribute:
      * provide the argument data_product on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       DATA_PRODUCT
          ID of the data product or fully qualified identifier for the data
          product.

          To set the data_product attribute:
          + provide the argument data_product on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          Location of the Dataplex resource.

          To set the location attribute:
          + provide the argument data_product on the command line with a
            fully specified name;
          + provide the argument --location on the command line;
          + set the property dataplex/location.

REQUIRED FLAGS
     --display-name=DISPLAY_NAME
        Display name of the Dataplex data product.

     --owner-emails=[OWNER_EMAILS,...]
        Emails of the data product owners.

OPTIONAL FLAGS
     --access-groups=ACCESS_GROUPS
        List of custom user-defined access groups at the data product level.
        Each access group should be a JSON string. Expected schema: { "id":
        "group-id", "display_name": "display-name", "description":
        "description", "principal": { "google_group": "group-email@example.com"
        } }

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        Description of the Dataplex data product.

     --labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to add.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

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

        $ gcloud alpha dataplex data-products create
```

### gcloud alpha dataplex data-products create

```text
NAME
    gcloud alpha dataplex data-products create - create a Dataplex data product
        resource

SYNOPSIS
    gcloud alpha dataplex data-products create
        (DATA_PRODUCT : --location=LOCATION) --display-name=DISPLAY_NAME
        --owner-emails=[OWNER_EMAILS,...] [--access-groups=ACCESS_GROUPS]
        [--async] [--description=DESCRIPTION] [--labels=[KEY=VALUE,...]]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/data-products/create (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
