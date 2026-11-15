---
source: https://docs.cloud.google.com/sdk/gcloud/reference/functions/describe
---

# gcloud functions describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud functions describe

```text
NAME
    gcloud functions describe - display details of a Google Cloud Function

SYNOPSIS
    gcloud functions describe (NAME : --region=REGION) [--v2]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Display details of a Google Cloud Function.

POSITIONAL ARGUMENTS
     Function resource - The Cloud Function name to describe. The arguments in
     this group can be used to specify the attributes of this resource. (NOTE)
     Some attributes are not given arguments in this group but can be set in
     other ways.

     To set the project attribute:
      * provide the argument NAME on the command line with a fully specified
        name;
      * provide the argument --project on the command line;
      * set the property core/project.

     This must be specified.

       NAME
          ID of the function or fully qualified identifier for the function.

          To set the function attribute:
          + provide the argument NAME on the command line.

          This positional argument must be specified if any of the other
          arguments in this group are specified.

       --region=REGION
          The Cloud region for the function. Overrides the default
          functions/region property value for this command invocation.

          To set the region attribute:
          + provide the argument NAME on the command line with a fully
            specified name;
          + provide the argument --region on the command line;
          + set the property functions/region.

FLAGS
     --v2
        If specified, this command will use Cloud Functions v2 APIs and return
        the result in the v2 format (See
        https://cloud.google.com/functions/docs/reference/rest/v2/projects.locations.functions#Function).
        If not specified, 1st gen and 2nd gen functions will use v1 and v2 APIs
        respectively and return the result in the corresponding format (For v1
        format, see
        https://cloud.google.com/functions/docs/reference/rest/v1/projects.locations.functions#resource:-cloudfunction).
        This command conflicts with --no-gen2. If specified with this
        combination, v2 APIs will be used.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha functions describe

        $ gcloud beta functions describe
```

### gcloud beta functions describe

```text
NAME
    gcloud beta functions describe - display details of a Google Cloud Function

SYNOPSIS
    gcloud beta functions describe (NAME : --region=REGION) [--v2]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha functions describe

```text
NAME
    gcloud alpha functions describe - display details of a Google Cloud
        Function

SYNOPSIS
    gcloud alpha functions describe (NAME : --region=REGION) [--v2]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/functions/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
