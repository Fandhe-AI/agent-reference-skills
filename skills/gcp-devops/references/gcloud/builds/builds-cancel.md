---
source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/cancel
---

# gcloud builds cancel

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud builds cancel

```text
NAME
    gcloud builds cancel - cancel an ongoing build

SYNOPSIS
    gcloud builds cancel BUILDS [BUILDS ...] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Cancel an ongoing build.

EXAMPLES
    To cancel a build 123-456-789:

        $ gcloud builds cancel '123-456-789'

    You may also cancel multiple builds at the same time:

        $ gcloud builds cancel '123-456-789', '987-654-321'

POSITIONAL ARGUMENTS
     BUILDS [BUILDS ...]
        IDs of builds to cancel

FLAGS
     --region=REGION
        The region of the Cloud Build Service to use. Must be set to a
        supported region name (e.g. us-central1). If unset, builds/region,
        which is the default region to use when working with Cloud Build
        resources, is used. If builds/region is unset, region is set to global.
        Note: Region must be specified in 2nd gen repo; global is not
        supported.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha builds cancel

        $ gcloud beta builds cancel
```

Adapted (not in the official docs): runnable form of the example(s) above: the corrections listed in Notes are applied.

```bash
gcloud builds cancel '123-456-789' '987-654-321'
```

### gcloud beta builds cancel

```text
NAME
    gcloud beta builds cancel - cancel an ongoing build

SYNOPSIS
    gcloud beta builds cancel BUILDS [BUILDS ...] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds cancel

```text
NAME
    gcloud alpha builds cancel - cancel an ongoing build

SYNOPSIS
    gcloud alpha builds cancel BUILDS [BUILDS ...] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Adapted from the official docs: where `gcloud help` wraps an example inside a value or leaves `$VARIABLE` placeholders unquoted, a runnable form with the lines joined and the variables quoted follows the help text.
- Corrected from the official docs (runnable form only; the help text above is verbatim): the multiple-builds example separates the IDs with a comma (`'123-456-789', '987-654-321'`); BUILDS is a space-separated list (SYNOPSIS `BUILDS [BUILDS ...]`), so the comma would become part of the first ID; the runnable form drops it.
- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/cancel (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
