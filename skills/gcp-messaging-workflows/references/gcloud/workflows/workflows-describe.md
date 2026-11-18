---
source: https://docs.cloud.google.com/sdk/gcloud/reference/workflows/describe
---

# gcloud workflows describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud workflows describe

```text
NAME
    gcloud workflows describe - show metadata for a workflow

SYNOPSIS
    gcloud workflows describe (WORKFLOW : --location=LOCATION)
        [--revision-id=REVISION_ID] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display all metadata associated with a workflow of given name and
    revisionID. If revisionID is not provided, the metadata for the latest
    revision is retrieved.

EXAMPLES
    To describe the workflow 'my-workflow' at revision '000001-dc1', run:

        $ gcloud workflows describe my-workflow `--revision-id=000001-dc1`

POSITIONAL ARGUMENTS
     Workflow resource - The name of the workflow to describe. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument workflow on the command line with a fully
        specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       WORKFLOW
          ID of the workflow or fully qualified identifier for the workflow.

          To set the workflow attribute:
          + provide the argument workflow on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --location=LOCATION
          The Cloud location for the workflow. Alternatively, set the property
          [workflows/location].

          To set the location attribute:
          + provide the argument workflow on the command line with a fully
            specified name;
          + provide the argument --location on the command line;
          + set the property workflows/location.

FLAGS
     --revision-id=REVISION_ID
        The revision ID of the workflow to describe.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

API REFERENCE
    This command uses the workflows/v1 API. The full documentation for this API
    can be found at: https://cloud.google.com/workflows

NOTES
    This variant is also available:

        $ gcloud beta workflows describe
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud workflows describe my-workflow \
    --revision-id=000001-dc1
```

### gcloud beta workflows describe

```text
NAME
    gcloud beta workflows describe - show metadata for a workflow

SYNOPSIS
    gcloud beta workflows describe (WORKFLOW : --location=LOCATION)
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the example wraps the flag in backticks (for example `` `--revision-id=000001-dc1` ``), which a shell runs as command substitution; the runnable form passes the flag without backticks. `my-data` stands for the workflow argument, which the `--data` description says is a "JSON string with data that will be passed to the workflow as an argument".
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/workflows/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
