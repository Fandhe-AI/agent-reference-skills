---
source: https://docs.cloud.google.com/sdk/gcloud/reference/deploy/delete
---

# gcloud deploy delete

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud deploy delete

```text
NAME
    gcloud deploy delete - deletes Delivery Pipeline(s), Target(s), Custom
        Target Type(s), and Automation(s) in a yaml configuration

SYNOPSIS
    gcloud deploy delete --file=FILE [--force] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    Deletes Delivery Pipeline(s), Target(s), Custom Target Type(s), and
    Automation(s) in a yaml configuration.

EXAMPLES
    To delete the resources in a Cloud Deploy YAML file deploy.yaml:

        $ gcloud deploy delete --file=deploy.yaml --region=us-central1

REQUIRED FLAGS
     --file=FILE
        Path to yaml file containing Delivery Pipeline(s), Target(s)
        declarative definitions.

OPTIONAL FLAGS
     --force
        If true, the delivery pipeline and its sub-resources (releases and
        rollouts) are deleted.

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

        $ gcloud alpha deploy delete

        $ gcloud beta deploy delete
```

### gcloud beta deploy delete

```text
NAME
    gcloud beta deploy delete - deletes Delivery Pipeline(s), Target(s), Custom
        Target Type(s), and Automation(s) in a yaml configuration

SYNOPSIS
    gcloud beta deploy delete --file=FILE [--force] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha deploy delete

```text
NAME
    gcloud alpha deploy delete - deletes Delivery Pipeline(s), Target(s),
        Custom Target Type(s), and Automation(s) in a yaml configuration

SYNOPSIS
    gcloud alpha deploy delete --file=FILE [--force] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/deploy/delete (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
