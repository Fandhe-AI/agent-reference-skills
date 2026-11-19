---
source: https://docs.cloud.google.com/sdk/gcloud/reference/deploy/apply
---

# gcloud deploy apply

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud deploy apply

```text
NAME
    gcloud deploy apply - applies a yaml configuration containing Delivery
        Pipeline(s), Target(s), Custom Target Type(s), Deploy Policy(ies), and
        Automation(s) declarative definitions

SYNOPSIS
    gcloud deploy apply --file=FILE [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Applies a yaml configuration containing Delivery Pipeline(s), Target(s),
    Custom Target Type(s), Deploy Policy(ies), and Automation(s) declarative
    definitions.

EXAMPLES
    To apply a Cloud Deploy YAML file deploy.yaml:

        $ gcloud deploy apply --file=deploy.yaml --region=us-central1

REQUIRED FLAGS
     --file=FILE
        Path to yaml file containing Delivery Pipeline(s), Target(s)
        declarative definitions.

OPTIONAL FLAGS
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

        $ gcloud alpha deploy apply

        $ gcloud beta deploy apply
```

### gcloud beta deploy apply

```text
NAME
    gcloud beta deploy apply - applies a yaml configuration containing Delivery
        Pipeline(s), Target(s), Custom Target Type(s), Deploy Policy(ies), and
        Automation(s) declarative definitions

SYNOPSIS
    gcloud beta deploy apply --file=FILE [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy apply

```text
NAME
    gcloud alpha deploy apply - applies a yaml configuration containing
        Delivery Pipeline(s), Target(s), Custom Target Type(s), Deploy
        Policy(ies), and Automation(s) declarative definitions

SYNOPSIS
    gcloud alpha deploy apply --file=FILE [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/deploy/apply (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
