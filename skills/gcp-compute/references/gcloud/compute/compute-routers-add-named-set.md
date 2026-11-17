---
source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/add-named-set
---

# gcloud compute routers add-named-set

## Signature / Usage

GA commands show the full `gcloud help` text; alpha and beta commands show NAME and SYNOPSIS (use `gcloud alpha|beta <command> --help` for the rest).

### gcloud compute routers add-named-set

```text
NAME
    gcloud compute routers add-named-set - add an empty named set to a Compute
        Engine router

SYNOPSIS
    gcloud compute routers add-named-set NAME --set-name=SET_NAME
        --set-type=SET_TYPE [--region=REGION] [GCLOUD_WIDE_FLAG ...]

DESCRIPTION
    gcloud compute routers add-named-set adds an empty named set to a Compute
    Engine router.

EXAMPLES
    To add a prefix named set my-set to a router my-router in region
    us-central1, run:

        $ gcloud compute routers add-named-set my-router \
          --region=us-central1 --set-name=my-set --set-type=PREFIX

POSITIONAL ARGUMENTS
     NAME
        Name of the router to update.

REQUIRED FLAGS
     --set-name=SET_NAME
        Name of the named set to add.

     --set-type=SET_TYPE
        Type of the set's elements. SET_TYPE must be one of:

         COMMUNITY
            The Named Set is a Community Named Set.
         PREFIX
            The Named Set is a Prefix Named Set.

OPTIONAL FLAGS
     --region=REGION
        Region of the router to update. If not specified, you might be prompted
        to select a region (interactive mode only).

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

        $ gcloud alpha compute routers add-named-set

        $ gcloud beta compute routers add-named-set
```

### gcloud beta compute routers add-named-set

```text
NAME
    gcloud beta compute routers add-named-set - add an empty named set to a
        Compute Engine router

SYNOPSIS
    gcloud beta compute routers add-named-set NAME --set-name=SET_NAME
        --set-type=SET_TYPE [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

### gcloud alpha compute routers add-named-set

```text
NAME
    gcloud alpha compute routers add-named-set - add an empty named set to a
        Compute Engine router

SYNOPSIS
    gcloud alpha compute routers add-named-set NAME --set-name=SET_NAME
        --set-type=SET_TYPE [--region=REGION] [GCLOUD_WIDE_FLAG ...]
```

## Notes

- Text taken verbatim from `gcloud meta generate-help-docs` of Google Cloud CLI 593.0.0 (retrieved 2026-11-14). Release tracks on this page: alpha, beta, ga.
- Examples are verbatim from `gcloud help`. Some wrap a long value with a trailing backslash and indentation (join the lines when running them), and some omit positional arguments that the SYNOPSIS requires; follow the SYNOPSIS.
- GCLOUD_WIDE_FLAG stands for the global flags (`--help`, `--project`, `--format`, `--quiet`, `--verbosity`, ...); see the gcloud-wide flags in the `gcp-cli` skill.
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/add-named-set (CC BY 4.0, code samples Apache 2.0; https://developers.google.com/site-policies)

## Related

- [README.md](./README.md)
