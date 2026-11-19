---
source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/context
---

# gcloud dataplex context

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud dataplex context lookup

```text
NAME
    gcloud dataplex context lookup - looks up metadata that can be used as
        context by agents

SYNOPSIS
    gcloud dataplex context lookup --resources=[RESOURCES,...]
        [--all-schema-fields] [--context-format=CONTEXT_FORMAT; default="yaml"]
        [--location=LOCATION] [--options=OPTIONS] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Looks up metadata that can be used as context by agents.

    Fetches detailed contextual metadata for the specified data assets. Data
    assets can be identified by their Dataplex entry name. The returned context
    can include schema, descriptions, business annotations, data quality
    insights, and relationships, structured for application use. This output is
    particularly useful for providing grounding to Large Language Models
    (LLMs), enabling more accurate and context-aware interactions with your
    data.

EXAMPLES
    To look up Dataplex Context for BigQuery tables 'table1' and 'table2' in
    dataset 'my-dataset' within project 'test-dataplex' in location
    'us-central1', run:

        $ gcloud dataplex context lookup --location=us-central1 \
          --project=test-dataplex --resources=resource1,resource2

    To look up context using Dataplex entry names:

        $ gcloud dataplex context lookup --location=us-central1 \
          --project=test-dataplex \
          --resources=projects/test-dataplex/locations/us-central1/\
        entryGroups/my-group/entries/my-entry

    To look up context using the default project and location from your gcloud
    configuration:

        $ gcloud dataplex context lookup --resources=resource1,resource2

REQUIRED FLAGS
     --resources=[RESOURCES,...]
        The identifier describing the resource, for example:
        projects/{project}/locations/{location}/entryGroups/{entry_group}/entries/{entry}

OPTIONAL FLAGS
     --all-schema-fields
        Includes all schema fields in the context.

     --context-format=CONTEXT_FORMAT; default="yaml"
        The output format of the command. CONTEXT_FORMAT must be one of: json,
        xml, yaml.

     Location resource - The Dataplex location for the context lookup. If not
     specified, the location will be taken from the dataplex/location property
     in your gcloud configuration. This represents a Cloud resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

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

     --options=OPTIONS
        Additional options for the command. This can be provided as a JSON
        string. Example: --options='{"key": "value"}'

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

        $ gcloud alpha dataplex context lookup
```

Adapted (not in the official docs): runnable form of the example(s) above: lines wrapped by `gcloud help` are joined.

```bash
gcloud dataplex context lookup \
    --location=us-central1 \
    --project=test-dataplex \
    --resources=projects/test-dataplex/locations/us-central1/entryGroups/my-group/entries/my-entry
```

### gcloud alpha dataplex context lookup

```text
NAME
    gcloud alpha dataplex context lookup - looks up metadata that can be used
        as context by agents

SYNOPSIS
    gcloud alpha dataplex context lookup --resources=[RESOURCES,...]
        [--all-schema-fields] [--context-format=CONTEXT_FORMAT; default="yaml"]
        [--location=LOCATION] [--options=OPTIONS] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/dataplex/context (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
