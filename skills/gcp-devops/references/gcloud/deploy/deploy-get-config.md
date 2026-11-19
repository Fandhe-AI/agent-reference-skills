---
source: https://docs.cloud.google.com/sdk/gcloud/reference/deploy/get-config
---

# gcloud deploy get-config

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud deploy get-config

```text
NAME
    gcloud deploy get-config - get the Cloud Deploy config for the provided
        region and project

SYNOPSIS
    gcloud deploy get-config [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Get the Cloud Deploy config for the provided region and project.

EXAMPLES
    To get the config for project test-project in region us-central1:

        $ gcloud deploy get-config --project=test-project \
            --region=us-central1

FLAGS
     Location resource - The Cloud region of {resource}. This represents a
     Cloud resource. (NOTE) Some attributes are not given arguments in this
     group but can be set in other ways.

     To set the project attribute:
      * provide the argument --region on the command line with a fully
        specified name;
      * set the property deploy/region with a fully specified name;
      * provide the argument --project on the command line;
      * set the property core/project.

     --region=REGION
        ID of the location or fully qualified identifier for the location.

        To set the region attribute:
        * provide the argument --region on the command line;
        * set the property deploy/region.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha deploy get-config

        $ gcloud beta deploy get-config
```

### gcloud beta deploy get-config

```text
NAME
    gcloud beta deploy get-config - get the Cloud Deploy config for the
        provided region and project

SYNOPSIS
    gcloud beta deploy get-config [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy get-config

```text
NAME
    gcloud alpha deploy get-config - get the Cloud Deploy config for the
        provided region and project

SYNOPSIS
    gcloud alpha deploy get-config [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/deploy/get-config (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
