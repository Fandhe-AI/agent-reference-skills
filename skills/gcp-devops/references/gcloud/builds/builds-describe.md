---
source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/describe
---

# gcloud builds describe

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud builds describe

```text
NAME
    gcloud builds describe - get information about a particular build

SYNOPSIS
    gcloud builds describe BUILD [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get information about a particular build.

EXAMPLES
    To describe a build 123-456-789:

        $ gcloud builds describe '123-456-789'

POSITIONAL ARGUMENTS
     BUILD
        The build to describe. The ID of the build is printed at the end of the
        build submission process, or in the ID column when listing builds.

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

        $ gcloud alpha builds describe

        $ gcloud beta builds describe
```

### gcloud beta builds describe

```text
NAME
    gcloud beta builds describe - get information about a particular build

SYNOPSIS
    gcloud beta builds describe BUILD [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds describe

```text
NAME
    gcloud alpha builds describe - get information about a particular build

SYNOPSIS
    gcloud alpha builds describe BUILD [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/describe (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
