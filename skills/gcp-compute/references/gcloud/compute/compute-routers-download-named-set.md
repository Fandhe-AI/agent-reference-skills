---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/download-named-set
---

# gcloud compute routers download-named-set

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute routers download-named-set

```text
NAME
    gcloud compute routers download-named-set - download a named set from a
        Compute Engine router

SYNOPSIS
    gcloud compute routers download-named-set NAME --file-name=FILE_NAME
        --set-name=SET_NAME [--file-format=FILE_FORMAT] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute routers download-named-set downloads a named set from a
    Compute Engine router.

EXAMPLES
    To download named set my-set on router my-router in region us-central1 to
    YAML file my-set.yaml, run:

        $ gcloud compute routers download-named-set my-router \
          --region=us-central1 --set-name=my-set --file-name=my-set.yaml

POSITIONAL ARGUMENTS
     NAME
        Name of the router with the named set to export.

REQUIRED FLAGS
     --file-name=FILE_NAME
        The name of the file to download the named set configuration to.

     --set-name=SET_NAME
        Name of the named set to download.

OPTIONAL FLAGS
     --file-format=FILE_FORMAT
        Format of the file passed to --file-name. If not specified, the default
        file format is YAML. FILE_FORMAT must be one of: json, yaml.

     --region=REGION
        Region of the router to operate on. If not specified, you might be
        prompted to select a region (interactive mode only).

        To avoid prompting when this flag is omitted, you can set the
        compute/region property:

            $ gcloud config set compute/region REGION

        A list of regions can be fetched by running:

            $ gcloud compute regions list

        To unset the property, run:

            $ gcloud config unset compute/region

        Alternatively, the region can be stored in the environment variable
        CLOUDSDK_COMPUTE_REGION.

GCLOUD WIDE FLAGS
    These flags are available to all commands: --access-token-file, --account,
    --billing-project, --configuration, --flags-file, --flatten, --format,
    --help, --impersonate-service-account, --log-http, --project, --quiet,
    --trace-token, --user-output-enabled, --verbosity.

    Run $ gcloud help for details.

NOTES
    These variants are also available:

        $ gcloud alpha compute routers download-named-set

        $ gcloud beta compute routers download-named-set
```

### gcloud beta compute routers download-named-set

```text
NAME
    gcloud beta compute routers download-named-set - download a named set from
        a Compute Engine router

SYNOPSIS
    gcloud beta compute routers download-named-set NAME --file-name=FILE_NAME
        --set-name=SET_NAME [--file-format=FILE_FORMAT] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute routers download-named-set

```text
NAME
    gcloud alpha compute routers download-named-set - download a named set from
        a Compute Engine router

SYNOPSIS
    gcloud alpha compute routers download-named-set NAME --file-name=FILE_NAME
        --set-name=SET_NAME [--file-format=FILE_FORMAT] [--region=REGION]
        [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/download-named-set (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
