---
source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/log
---

# gcloud builds log

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud builds log

```text
NAME
    gcloud builds log - stream the logs for a build

SYNOPSIS
    gcloud builds log BUILD [--region=REGION] [--stream] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Stream the logs for a build.

EXAMPLES
    To stream logs for in progress build 123-456-789:

        $ gcloud builds log --stream `123-456-789`

    To display logs for a completed build 098-765-432:

        $ gcloud builds log `098-765-432`

POSITIONAL ARGUMENTS
     BUILD
        The build whose logs shall be printed. The ID of the build is printed
        at the end of the build submission process, or in the ID column when
        listing builds.

FLAGS
     --region=REGION
        The region of the Cloud Build Service to use. Must be set to a
        supported region name (e.g. us-central1). If unset, builds/region,
        which is the default region to use when working with Cloud Build
        resources, is used. If builds/region is unset, region is set to global.
        Note: Region must be specified in 2nd gen repo; global is not
        supported.

     --stream
        If a build is ongoing, stream the logs to stdout until the build
        completes.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha builds log

        $ gcloud beta builds log
```

### gcloud beta builds log

```text
NAME
    gcloud beta builds log - stream the logs for a build

SYNOPSIS
    gcloud beta builds log BUILD [--region=REGION] [--stream]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha builds log

```text
NAME
    gcloud alpha builds log - stream the logs for a build

SYNOPSIS
    gcloud alpha builds log BUILD [--region=REGION] [--stream]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/builds/log (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
