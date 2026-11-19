---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/data-products/update
---

# gcloud dataplex data-products update

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dataplex data-products update

```text
NAME
    gcloud dataplex data-products update - update a Dataplex data product
        resource

SYNOPSIS
    gcloud dataplex data-products update (DATA_PRODUCT : --location=LOCATION)
        [--access-groups=ACCESS_GROUPS] [--async] [--description=DESCRIPTION]
        [--display-name=DISPLAY_NAME] [--owner-emails=[OWNER_EMAILS,...]]
        [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Update a Dataplex data product resource.

EXAMPLES
    To update display name of data product test-dp in location us-central1,
    run:

        $ gcloud dataplex data-products update test-dp \
          --location=us-central1 --display-name="new dp name"

POSITIONAL ARGUMENTS
     Data product resource - Arguments and flags that specify the Dataplex Data
     Product you want to update. The arguments in this group can be used to
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

FLAGS
     --access-groups=ACCESS_GROUPS
        New access groups to associate with the Dataplex data product. This
        will replace the existing access groups. Each access group should be a
        JSON string. Expected schema: { "id": "group-id", "display_name":
        "display-name", "description": "description", "principal": {
        "google_group": "group-email@example.com" } }

     --async
        Return immediately, without waiting for the operation in progress to
        complete.

     --description=DESCRIPTION
        New description of the Dataplex data product.

     --display-name=DISPLAY_NAME
        New display name of the Dataplex data product.

     --owner-emails=[OWNER_EMAILS,...]
        New emails of the data product owners.

     --update-labels=[KEY=VALUE,...]
        List of label KEY=VALUE pairs to update. If a label exists, its value
        is modified. Otherwise, a new label is created.

        Keys must start with a lowercase character and contain only hyphens
        (-), underscores (_), lowercase characters, and numbers. Values must
        contain only hyphens (-), underscores (_), lowercase characters, and
        numbers.

     At most one of these can be specified:

       --clear-labels
          Remove all labels. If --update-labels is also specified then
          --clear-labels is applied first.

          For example, to remove all labels:

              $ gcloud dataplex data-products update --clear-labels

          To remove all existing labels and create two new labels, foo and baz:

              $ gcloud dataplex data-products update --clear-labels \
                --update-labels foo=bar,baz=qux

       --remove-labels=[KEY,...]
          List of label keys to remove. If a label does not exist it is
          silently ignored. If --update-labels is also specified then
          --update-labels is applied first.

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

        $ gcloud alpha dataplex data-products update
```

### gcloud alpha dataplex data-products update

```text
NAME
    gcloud alpha dataplex data-products update - update a Dataplex data product
        resource

SYNOPSIS
    gcloud alpha dataplex data-products update
        (DATA_PRODUCT : --location=LOCATION) [--access-groups=ACCESS_GROUPS]
        [--async] [--description=DESCRIPTION] [--display-name=DISPLAY_NAME]
        [--owner-emails=[OWNER_EMAILS,...]] [--update-labels=[KEY=VALUE,...]]
        [--clear-labels | --remove-labels=[KEY,...]] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/data-products/update (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
